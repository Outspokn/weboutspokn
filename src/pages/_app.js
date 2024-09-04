import "@/styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import styles from "@/styles/Home.module.css";
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={nunitoSans.className}>
      <SpeedInsights />
      <Component {...pageProps} />
    </main>
  );
}
