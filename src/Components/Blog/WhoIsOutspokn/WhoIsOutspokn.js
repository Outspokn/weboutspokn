import React, { useState, useEffect } from "react";
import styles from "./WholsOutspokn.module.css";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const WhoIsOutspokn = ({ lottieUrl }) => {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    const fetchLottieData = async () => {
      try {
        const response = await fetch(lottieUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error fetching Lottie animation data:", error);
      }
    };

    fetchLottieData();
  }, [lottieUrl]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.description}>
          <h2>Who is Outspokn?</h2>
          <p>
            Outspokn is the fastest way to get fluent in English. Quickly and
            easily become fluent in English through engaging conversations. Gain
            the ability to speak fluently convincingly, so that you can
            effortlessly engage any audience.
          </p>
        </div>
      </div>
      <div className={styles.lottieAnimation}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </section>
  );
};

export default WhoIsOutspokn;
