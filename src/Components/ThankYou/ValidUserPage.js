import React from "react";
import styles from "./ValidUserPage.module.css";
import Image from "next/image";

const ValidUserPage = ({ valid, os }) => {
  return valid ? (
    <div className={styles.validWrapper}>
      <div className={styles.leftside}>
        <h1>
          Welcome <span>Somnath</span> from <span>Skillslash</span> Institute
        </h1>
        <p className={styles.desc}>
          Enhance your English by chatting with Outspokn on any topic—sports,
          tech, business, fashion, or your latest book or show. Outspokn is
          always ready for a great conversation!
        </p>
        <p className={styles.paraHead}>Download our Application</p>
        <div className={styles.linkWrapper}>
          <div className={styles.link}>
            <div className={styles.googlePlayStore}>
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/GooglePlayStore.png"
                alt="Download from play store"
                width={170}
                height={53}
                priority
              />
            </div>
            <div className={styles.googlePlayStore}>
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/appStore_new.png"
                alt="Download from app store"
                width={170}
                height={55}
              />
            </div>
          </div>
          <Image
            style={{ cursor: "pointer" }}
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/androidQr.png"
            alt="qr for download"
            width={140}
            height={140}
          />
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.headerImg}>
          <Image
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/HeaderMobile.png"
            alt="Header Image"
            fill
            priority
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.invalidWrapper}>invalid user</div>
  );
};

export default ValidUserPage;
