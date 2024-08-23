import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust the scroll distance as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`${styles.navWrapper} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.imgWrapper}>
        <Image
          src="https://outspoknweb.s3.us-east-2.amazonaws.com/Outspokn-logo-new.png"
          alt="outspoknlogo"
          fill
          priority
        />
      </div>
      <div className={styles.PlayStore}>
        <div className={styles.googlePlayStore}>
          <Image
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/GooglePlayStore.png"
            alt="Download from play store"
            fill
          />
        </div>
        <div className={styles.googlePlayStore}>
          <Image
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/appStore_new.png"
            alt="Download from app store"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
