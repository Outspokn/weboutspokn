import "@/styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"], // Removed 1000
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={nunitoSans.className}>
      <SpeedInsights />
      <Component {...pageProps} />
    </main>
  );
}
