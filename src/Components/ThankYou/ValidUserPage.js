import React from "react";
import styles from "./ValidUserPage.module.css";
import Image from "next/image";

const ValidUserPage = ({ valid, name, username, message }) => {
  // Check if the message contains a specific substring
  const messageIncludesLink = message.includes("User already linked with");

  // Define the header message based on the substring check
  const headerMessage = messageIncludesLink
    ? message
    : `Welcome ${username} from ${name}`;
  console.log(username);
  return valid ? (
    <div className={styles.validWrapper}>
      <div className={styles.leftside}>
        <h1>{headerMessage}</h1>

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
            width={130}
            height={130}
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
