import { useState } from "react";
import styles from "./SubscribeSection.module.css";
import { MdEmail } from "react-icons/md";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("default");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email || !isValidEmail(email)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.outspokn.ai/alerts/subscribe_newsletter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTk5MDg1NzAsImlhdCI6MTcxOTgyMjE3MCwidWlkIjo4NywidG9rZW5fdXNlciI6InVzZXIifQ.jYRdcuOzN_aZD586MN9IUx_reaCOdUceBASHd7Rbtn4",
          },
          body: JSON.stringify({
            email: email,
            newsletter_passkey: "outspokn_nws9021",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.message === "Email already subscribed.") {
          setSubscriptionStatus("alreadySubscribed");
        } else {
          setSubscriptionStatus("subscribed");
        }
      }
    } catch (error) {
      console.log("An error occurred. Please try again:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.subscribeSection}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <h2>Subscribe For New Content</h2>
          <p>
            By Becoming A Member Of Our Blog, You Have Access To Articles And
            Content.
          </p>
        </div>
        <div className={styles.rightContent}>
          <h4>Email</h4>
          <div className={styles.subscription}>
            <div className={styles.inputWrapper}>
              <MdEmail className={styles.icon} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscriptionStatus("default");
                }}
                disabled={
                  loading ||
                  subscriptionStatus === "subscribed" ||
                  subscriptionStatus === "alreadySubscribed"
                }
              />
            </div>
            <button
              onClick={handleSubscribe}
              disabled={
                loading ||
                subscriptionStatus === "subscribed" ||
                subscriptionStatus === "alreadySubscribed"
              }
            >
              {loading
                ? "Subscribing..."
                : subscriptionStatus === "subscribed"
                ? "Subscribed"
                : subscriptionStatus === "alreadySubscribed"
                ? "Already Subscribed"
                : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
