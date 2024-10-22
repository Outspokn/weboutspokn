import React from "react";
import Image from "next/image";
import styles from "./MainContent.module.css";
import Link from "next/link";

const MainSection = () => {
  return (
    <section className={styles.mainContent}>
      <div className={styles.textContent}>
        <h1>Unlock your team's English potential</h1>
        <p>
          Outspokn is here to boost your team's success in any field by
          polishing their everyday and business English skills. We've got
          special plans tailored for different businesses. Get started today!
        </p>
        <button className={styles.ctaButton}>See plans</button>
        <p className={styles.loginText}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
      <div className={styles.imagesContent}>
        <div className={styles.imageLeft}>
          <Image
            src="/assets/business1.jpg"
            alt="Image 1"
            className={styles.image}
            width={300}
            height={300}
          />
        </div>

        <div className={styles.imageRightTop}>
          <Image
            src="/assets/business2.jpg"
            alt="Image 2"
            className={styles.image}
            width={300}
            height={300}
          />
        </div>

        <div className={styles.imageRightBottom}>
          <Image
            src="/assets/business3.png"
            alt="Image 3"
            className={styles.image}
            width={300}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
