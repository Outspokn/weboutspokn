import React from "react";
import styles from "./ThirdSection.module.css";
import Image from "next/image";
import { MdOutlineMic } from "react-icons/md";
import Link from "next/link";

const ThirdSection = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.Left}>
        <h2 className={styles.heading}>
          Ready to take your English to new heights?
        </h2>
        <p className={styles.Content}>
          Accelerate your english learning by downloading the outspokn app now
        </p>
        <div className={styles.PlayStore}>
          <button className={styles.googlePlayStore}>
            <Link
              href="https://play.google.com/store/apps/details?id=com.outspokn"
              id="ps-2"
            >
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/Feature/get-it-on-google-play-logo-white.png"
                alt="Download from play store"
                fill
              />
            </Link>
          </button>
          <button className={styles.googlePlayStore}>
            <Link
              href="https://apps.apple.com/us/app/outspokn/id6737053468"
              id="as-2"
            >
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/AppStore_white.png"
                alt="Download from App store"
                fill
              />
            </Link>
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.waveAnimation}>
          <div id="a">
            <div className={styles.circleRipple}>
              <MdOutlineMic className={styles.mic} />
            </div>
          </div>
        </div>
        <div className={styles.rightImg}>
          <Image
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/Feature/cta-phone.png"
            alt="USPs"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
