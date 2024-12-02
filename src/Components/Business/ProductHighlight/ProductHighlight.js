import React from "react";
import styles from "./ProductHighlight.module.css";
import Image from "next/image";

const ProductHighlight = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.textSection}>
        <h2>Anything, anywhere, anytime.</h2>
        <p>
          Outspokn, your always-there AI tutor, offers a safe, judgement-free
          zone for practicing English. It’s dedicated to empowering you every
          step of the way, provides feedback and tools to boost your confidence,
          making your path to English mastery both effective and fast.
        </p>
      </div>
      <div className={styles.imageSection}>
        <Image
          src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/HeaderMobile.png"
          alt="Header Image"
          className={styles.chatImage}
          width={300}
          height={533}
          priority
        />
      </div>
    </div>
  );
};

export default ProductHighlight;
