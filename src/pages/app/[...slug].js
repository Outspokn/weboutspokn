import { useEffect } from "react";
import { useRouter } from "next/router";

const AppPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { slug } = router.query;
    const screen = slug ? slug.join("/") : "";
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
