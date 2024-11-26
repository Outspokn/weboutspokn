import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const Header = ({ lottieUrl }) => {
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
    <div className={styles.headerbg}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerHeading}>
          Learn English faster using conversations
        </h1>
        <p className={styles.headerContent}>
          Quickly and easily become fluent in English through engaging
          conversations!
        </p>
        <div className={styles.headerContentImages}>
          <div className={styles.googlePlayStore}>
            <Link
              href="https://play.google.com/store/apps/details?id=com.outspokn"
              id="ps-1"
            >
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/GooglePlayStore.png"
                alt="Download from play store"
                fill
                priority
              />
            </Link>
          </div>
          <div className={styles.googlePlayStore}>
            <Link
              href="https://apps.apple.com/us/app/outspokn/id6737053468"
              id="as-1"
            >
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/appStore_new.png"
                alt="Download from app store"
                fill
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.headerImg}>
          <Image
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/HeaderMobile.png"
            alt="Header Image"
            fill
            priority
          />
        </div>
        <div className={styles.lottieAnimation}>
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Header;
