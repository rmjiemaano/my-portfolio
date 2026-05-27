import { NextResponse } from "next/server";
import crypto from "crypto";

// Section 2.1: Structural Data Contracts for Type Safety
interface OkxCoinDetail {
  ccy: string;
  eq?: string;
  availBal?: string;
  frozenBal?: string;
  upl?: string;
}

interface NormalizedAsset {
  currency: string;
  equity: string;
  available: string;
  frozen: string;
  upl: string;
}

function generateOkxHeaders(method: "GET" | "POST", requestPath: string, body: string = "") {
  const apiKey = process.env.OKX_API_KEY;
  const apiSecret = process.env.OKX_API_SECRET;
  const apiPassphrase = process.env.OKX_API_PASSPHRASE;

  if (!apiKey || !apiSecret || !apiPassphrase) {
    throw new Error("Missing OKX environment credentials in runtime context.");
  }

  const timestamp = new Date().toISOString();
  const prehash = timestamp + method + requestPath + body;
  
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(prehash)
    .digest("base64");

  return {
    "OK-ACCESS-KEY": apiKey,
    "OK-ACCESS-SIGN": signature,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": apiPassphrase,
    "Content-Type": "application/json",
  };
}

export async function GET() {
  try {
    const baseUrl = "https://www.okx.com";
    const balancePath = "/api/v5/account/balance";
    const configPath = "/api/v5/account/config";

    const [balanceResponse, configResponse] = await Promise.all([
      fetch(`${baseUrl}${balancePath}`, {
        method: "GET",
        headers: generateOkxHeaders("GET", balancePath),
        next: { revalidate: 30 },
      }),
      fetch(`${baseUrl}${configPath}`, {
        method: "GET",
        headers: generateOkxHeaders("GET", configPath),
        next: { revalidate: 60 },
      }),
    ]);

    if (!balanceResponse.ok || !configResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to communicate securely with OKX API gateways." },
        { status: 502 }
      );
    }

    const balanceData = await balanceResponse.json();
    const configData = await configResponse.json();

    if (balanceData.code !== "0" || configData.code !== "0") {
      return NextResponse.json(
        { 
          success: false, 
          error: "OKX Endpoint Error encountered", 
          details: balanceData.msg || configData.msg 
        },
        { status: 400 }
      );
    }

    // Section 2.2: Implement concrete type mapping arrays
    const rawAccount = balanceData.data[0] || {};
    const rawConfig = configData.data[0] || {};

    const portfolioMetrics = {
      totalEquityUsd: parseFloat(rawAccount.totalEq || "0").toFixed(2),
      totalIsolatedMargin: parseFloat(rawAccount.isoEq || "0").toFixed(2),
      totalAvailableBalance: parseFloat(rawAccount.availEq || "0").toFixed(2),
      assets: (rawAccount.details as OkxCoinDetail[] || [])
        .map((coin: OkxCoinDetail): NormalizedAsset => ({
          currency: coin.ccy,
          equity: parseFloat(coin.eq || "0").toFixed(4),
          available: parseFloat(coin.availBal || "0").toFixed(4),
          frozen: parseFloat(coin.frozenBal || "0").toFixed(4),
          upl: parseFloat(coin.upl || "0").toFixed(2), 
        }))
        .filter((asset: NormalizedAsset) => parseFloat(asset.equity) > 0),
      systemCapabilities: {
        accountLevel: rawConfig.level || "Standard Mode",
        positionMode: rawConfig.posMode === "long_short" ? "Long/Short Multi-Side" : "Net Position Mode",
        marginMode: rawConfig.acctLv === "1" ? "Simple" : rawConfig.acctLv === "2" ? "Single-Currency" : rawConfig.acctLv === "3" ? "Multi-Currency" : "Portfolio Margin",
        greeksDisplay: rawConfig.greeksType === "PA" ? "Premium Dollar (PA)" : "Standard Volatility (BS)",
        autoBorrowEnabled: rawConfig.autoBorrow ? "Active" : "Disabled",
      }
    };

    return NextResponse.json({ success: true, data: portfolioMetrics });

  } catch (error: unknown) {
    console.error("Critical OKX Route Handler Intercept:", error);
    return NextResponse.json(
      { success: false, error: "Internal processing sequence timeout failure." },
      { status: 500 }
    );
  }
}