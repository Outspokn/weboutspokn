import React from "react";
import styles from "./Features.module.css";
import CardBox from "./Card";
import Image from "next/image";

const Features = () => {
  return (
    <div className={styles.featureWrap}>
      <div className={styles.headerWrap}>
        <h2 className={styles.heading}>
          The quickest path to learning english with insightful feedback
        </h2>
        <p className={styles.desc}>
          Gain the ability to speak fluently and convincingly. <br />
          Effortlessly engage any audience
        </p>
      </div>
      <div className={styles.featureContent}>
        {/* <div className={styles.gradientBack}></div> */}
        <div className={styles.columnDiv}>
          <CardBox
            height={30}
            width={30}
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/Feature/pratice-icon.png"
            title="Supervised Practice"
            desc="Accelerate your learning with our AI-powered platform, offering structured lessons, hands-on practice, and feedback-driven guidance."
          />
          <CardBox
            height={30}
            width={30}
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/Feature/educator-network.png"
            title="Trusted Educator Network"
            desc="Access top-tier, vetted educators tailored to your needs through our curated network, ensuring personalized guidance and support."
          />
        </div>
        <div className={styles.singleDiv}>
          <p className={styles.singleDesc}>
            Your on-the-go English coaching companion
          </p>
          <div className={styles.singleImgContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/Feature/iphone-image.png"
                fill
                alt="talk with ai"
              />
            </div>
          </div>
        </div>
        <div className={styles.columnDiv}>
          <CardBox
            height={30}
            width={30}
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/Feature/ai-ineraction.png"
            title="Peer and AI Interaction"
            desc="Engage in conversations with AI and peers in a safe, supportive, judgment-free environment, and get ready for real-world interactions."
          />
          <CardBox
            height={29}
            width={34}
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/Feature/supervised-icon.png"
            title="Instant Translation"
            desc="Enhance your learning with instant translations in over 100 languages, making English mastery accessible wherever you are."
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
