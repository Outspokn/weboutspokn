import { useEffect } from "react";
import { useRouter } from "next/router";
import { sendGAEvent } from "@next/third-parties/google";

const AppPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { slug, utm_source, type, utm_medium, utm_campaign } = router.query;

    const screen = slug ? slug.join("/") : "";
    // 1. Trigger Google Analytics Event
    sendGAEvent({
      event: "user_redirect",
      category: "DeepLink",
      label: "App Redirection",
      type: type || "home",
      utm_medium: utm_medium || "unknown",
      utm_source: utm_source || "unknown",
      utm_campaign: utm_campaign || "default",
    });
    window.location.href = `/api/deeplink?screen=${screen}`;
  }, [router.query]);

  return (
    <div>
      <h1>Redirecting...</h1>
      <p>
        If the app isnt installed, youll be redirected to the App Store or Play
        Store shortly.
      </p>
    </div>
  );
};

export default AppPage;
