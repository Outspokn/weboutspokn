import React from "react";
import Image from "next/image";
import styles from "./WholsOutspokn.module.css";

const WhoIsOutspokn = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.description}>
          <h2>Who is Outspokn?</h2>
          <p>
            Timiker.io is a collaborative, cloud-based time tracking service
            that helps businesses of any size manage their projects, track
            working times and measure productivity.
          </p>
        </div>
        <div className={styles.reviews}>
          <div className={styles.reviewItem}>
            <Image
              src="/assets/capterra.jpg"
              alt="Capterra Logo"
              objectFit="contain"
              width={100}
              height={40}
            />
            <p>12,000+ reviews</p>
            <div className={styles.stars}>★★★★★</div>
          </div>
          <div className={styles.reviewItem}>
            <Image
              src="/assets/trustpilot.jpg"
              alt="Trustpilot Logo"
              objectFit="contain"
              width={100}
              height={40}
            />
            <p>8,000+ reviews</p>
            <div className={styles.stars}>★★★★</div>
          </div>
          <div className={styles.reviewItem}>
            <Image
              src="/assets/getApp.png"
              alt="GetApp Logo"
              width={100}
              height={40}
            />
            <p>4,300+ reviews</p>
            <div className={styles.stars}>★★★</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsOutspokn;
