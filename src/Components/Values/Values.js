import React, { useEffect, useState } from "react";
import styles from "./Values.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import lottie-react to ensure it only loads on the client side
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const Values = ({ title, desc, src, inverted, lottieUrl, imageChange }) => {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    if (inverted) {
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
    }
  }, [lottieUrl, inverted]);
  return (
    <div
      className={inverted ? styles.valuesWrapperInverted : styles.valuesWrapper}
    >
      {inverted ? (
        ""
      ) : (
        <div className={styles.leftValue}>
          <div className={styles.imgWrapper}>
            <Image src={src} alt="feature-1" fill />
          </div>
        </div>
      )}

      <div className={styles.rightValue}>
        <h2 className={styles.valueHeading}>{title}</h2>
        <p className={styles.valueDesc}>{desc}</p>
      </div>
      {inverted && !imageChange && (
        <div className={styles.leftValueInverted}>
          <div className={styles.imgWrapperInverted}>
            <Image src={src} alt="feature-1" fill />
            <div className={styles.lottieAnimation}>
              <Lottie animationData={animationData} loop={true} />
            </div>
          </div>
        </div>
      )}
{inverted && imageChange && (
        <div className={styles.leftValue}>
          <div className={styles.imgWrapper}>
            <Image src={src} alt="feature-1" fill />
            <div className={styles.lottieAnimation}>
              <Lottie animationData={animationData} loop={true} />
            </div>
          </div>
        </div>
      )}
    </div>
     
  
  );
};

export default Values;
