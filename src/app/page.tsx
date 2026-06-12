import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { CryptoDashboard } from "@/components/CryptoDashboard";
import RoomSensor from "@/components/RoomSensor";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <CryptoDashboard />
      {/* <RoomSensor /> */} {/* Commented out for now, esp32 node currently not available */}
      <Contact />
      <Footer />
    </main>
  );
}