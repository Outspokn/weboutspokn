import { useEffect } from "react";
import { useRouter } from "next/router";
import { sendGTMEvent } from "@next/third-parties/google";

const AppPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { slug, source, campaignName, type } = router.query;

    const screen = slug ? slug.join("/") : "";
    // 1. Trigger Google Analytics Event
    // sendGTMEvent({
    //   event: "user_redirect",
    //   category: "DeepLink",
    //   label: "App Redirection",
    //   data: {
    //     type: type || "home",
    //     source: source || "unknown",
    //     campaignName: campaignName || "default",
    //   },
    // });
    window.gtag("event", "user_redirect", {
      category: "DeepLink",
      label: "App Redirection",
      type: type || "home",
      source: source || "unknown",
      campaignName: campaignName || "default",
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
