import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const SNAPSHOT_PATH = path.join(process.cwd(), "data", "okx-snapshot.json");

interface OkxSnapshot {
  savedDate: string;
  previousBalance: string;
  lastTrackedBalance: string;
}

interface OkxAssetDetail {
  ccy: string;
  eq: string;
  availEq: string;
  frozenBal: string;
  upl: string;
}

async function ensureSnapshotFileExists(initialBalance: string): Promise<OkxSnapshot> {
  const dirPath = path.dirname(SNAPSHOT_PATH);
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {
    // Directory initialized
  }

  try {
    const fileContent = await fs.readFile(SNAPSHOT_PATH, "utf-8");
    return JSON.parse(fileContent) as OkxSnapshot;
  } catch {
    const defaultData: OkxSnapshot = {
      savedDate: new Date().toISOString().split("T")[0],
      previousBalance: initialBalance,
      lastTrackedBalance: initialBalance,
    };
    await fs.writeFile(SNAPSHOT_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
}

// Section 2.1: Cryptographic helper to sign outbound requests for private OKX V5 endpoints
function generateOkxHeaders(method: string, requestPath: string) {
  const apiKey = process.env.OKX_API_KEY;
  const apiSecret = process.env.OKX_API_SECRET;
  const passphrase = process.env.OKX_API_PASSPHRASE;

  if (!apiKey || !apiSecret || !passphrase) {
    throw new Error("Missing OKX Authentication keys in environment profile.");
  }

  const timestamp = new Date().toISOString();
  const message = timestamp + method + requestPath;
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(message)
    .digest("base64");

  return {
    "OK-ACCESS-KEY": apiKey,
    "OK-ACCESS-SIGN": signature,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": passphrase,
    "Content-Type": "application/json",
  };
}

export async function GET() {
  try {
    // Section 2.2: Fetching actual data from the live OKX account balance endpoint
    const requestPath = "/api/v5/account/balance";
    const targetUrl = `https://www.okx.com${requestPath}`;
    const headers = generateOkxHeaders("GET", requestPath);

    const okxResponse = await fetch(targetUrl, {
      method: "GET",
      headers: headers,
      next: { revalidate: 10 }, // Cache response for 10 seconds to throttle reload spam
    });

    const okxResult = await okxResponse.json();

    if (!okxResponse.ok || okxResult.code !== "0") {
      throw new Error(okxResult.msg || `OKX Node returned response status code ${okxResult.code}`);
    }

    const accountData = okxResult.data[0];
    
    // Safely round raw API strings to a clean 2-decimal presentation format
    const totalEquityUsd = parseFloat(accountData.totalEq || "0").toFixed(2);
    const totalIsolatedMargin = parseFloat(accountData.isoEq || "0").toFixed(2);
    const totalAvailableBalance = parseFloat(accountData.availEq || "0").toFixed(2);

    // Section 2.3: Map raw account currency details to match your frontend Asset interface
    const rawAssets: OkxAssetDetail[] = accountData.details || [];
    const formattedAssets = rawAssets
      .filter((asset) => parseFloat(asset.eq) > 0.0001) // Filters out empty dust balances
      .map((asset) => ({
        currency: asset.ccy,
        equity: parseFloat(asset.eq).toFixed(4),
        available: parseFloat(asset.availEq).toFixed(4),
        frozen: parseFloat(asset.frozenBal).toFixed(4),
        upl: parseFloat(asset.upl || "0").toFixed(2),
      }));

    // Construct unified payload matching DashboardMetrics blueprint
    const liveMetrics = {
      totalEquityUsd,
      totalIsolatedMargin,
      totalAvailableBalance,
      assets: formattedAssets,
    };

    // Section 2.4: Evaluation block to update your local snapshot for Cooked/Locked In tracking
    const todayStr = new Date().toISOString().split("T")[0];
    const snapshot = await ensureSnapshotFileExists(totalEquityUsd);
    let historicalClose = snapshot.previousBalance;

    if (snapshot.savedDate !== todayStr) {
      historicalClose = snapshot.lastTrackedBalance;
      const updatedSnapshot: OkxSnapshot = {
        savedDate: todayStr,
        previousBalance: historicalClose,
        lastTrackedBalance: totalEquityUsd,
      };
      await fs.writeFile(SNAPSHOT_PATH, JSON.stringify(updatedSnapshot, null, 2), "utf-8");
    } else {
      const updatedSnapshot: OkxSnapshot = {
        ...snapshot,
        lastTrackedBalance: totalEquityUsd,
      };
      await fs.writeFile(SNAPSHOT_PATH, JSON.stringify(updatedSnapshot, null, 2), "utf-8");
    }

    return NextResponse.json({
      success: true,
      data: {
        ...liveMetrics,
        previousEquityUsd: historicalClose,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Internal transport failure inside authentication middleware." 
      },
      { status: 500 }
    );
  }
}