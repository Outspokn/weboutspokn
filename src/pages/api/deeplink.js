export default function handler(req, res) {
  const userAgent = req.headers["user-agent"];
  const { screen } = req.query;

  // Construct the deep link URL for your app
  const deepLink = `outspokn://app/${screen || ""}`;

  // Store URLs
  const appStoreUrl = "https://apps.apple.com/us/app/outspokn/id6737053468";
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.outspokn";

  // Detect platform
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    // Attempt to open the app for iOS
    res.setHeader(
      "Content-Security-Policy",
      `default-src *; connect-src *; script-src * 'unsafe-eval'; style-src * 'unsafe-inline';`
    );
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
    // Attempt to open the app for Android
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
