export default function handler(req, res) {
  const userAgent = req.headers["user-agent"];
  const { screen, utm_source, utm_campaign, utm_medium } = req.query;
  // console.log(screen, utm_source, utm_campaign, utm_medium, "parameters");

  // Construct the deep link URL for your app
  const queryParams = new URLSearchParams({
    utm_source: utm_source || "unknown",
    utm_campaign: utm_campaign || "default",
    utm_medium: utm_medium || "unknown",
  }).toString();

  const deepLink = `outspokn://app/${screen || ""}?${queryParams}`;
  console.log(deepLink, "deeplink");

  // Store URLs

  const playStoreUrl = `https://play.google.com/store/apps/details?id=com.outspokn&referrer=utm_source=${
    utm_source || "unknown"
  }&utm_campaign=${utm_campaign || "default"}&utm_medium=${
    utm_medium || "unknown"
  }`;
  const appStoreUrl = `https://apps.apple.com/us/app/outspokn/id6737053468`;

  // Detect platform on OS
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    const universalLink = `https://www.outspokn.ai/app/${
      screen || ""
    }?${queryParams}`;
    res.send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="1;url=${deepLink}" />
        </head>
        <body>
          <script>
            setTimeout(() => {
              window.location.href = "${appStoreUrl}";
            }, 2000);
          </script>
        </body>
      </html>
    `);
  } else if (isAndroid) {
    res.send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="1;url=${deepLink}" />
        </head>
        <body>
          <script>
            setTimeout(() => {
              window.location.href = "${playStoreUrl}";
            }, 2000);
          </script>
        </body>
      </html>
    `);
  } else {
    // Redirect unsupported platforms to a fallback webpage
    res.redirect("/");
  }
}
