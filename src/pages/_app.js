import "@/styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "dotenv/config";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"], // Removed 1000
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-F1PNKZRHQH');
          `,
        }}
      />
      <main className={nunitoSans.className}>
        <SpeedInsights />
        <Component {...pageProps} />
      </main>
    </>
  );
}
