export const handlePlayStoreClick = () => {
  if (typeof window.fbq === "function") {
    window.fbq("track", "PlayStore", {
      buttonName: "App_install_Android",
      pageCategory: "homepage",
    });
    console.log("PlayStore event fired");
  } else {
    console.error("Facebook Pixel is not initialized.");
  }
};

export const handleAppStoreClick = () => {
  if (typeof window.fbq === "function") {
    window.fbq("track", "AppStore", {
      buttonName: "App_install_iOS",
      pageCategory: "homepage",
    });
    console.log("AppStore event fired");
  } else {
    console.error("Facebook Pixel is not initialized.");
  }
};
