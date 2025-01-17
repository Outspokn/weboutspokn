import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { handleAppStoreClick, handlePlayStoreClick } from "@/lib/fbEvent";

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
        <Link href="/" style={{ cursor: "pointer" }}>
          <Image
            src="https://outspoknweb.s3.us-east-2.amazonaws.com/Outspokn-logo-new.png"
            alt="outspoknlogo"
            fill
            priority
          />
        </Link>
      </div>
      <div className={styles.PlayStore}>
        <button
          className={styles.googlePlayStore}
          onClick={handlePlayStoreClick}
        >
          <Link
            href="https://play.google.com/store/apps/details?id=com.outspokn"
            id="ps-h"
          >
            <Image
              src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/GooglePlayStore.png"
              alt="Download from play store"
              fill
            />
          </Link>
        </button>
        <button
          className={styles.googlePlayStore}
          onClick={handleAppStoreClick}
        >
          <Link
            href="https://apps.apple.com/us/app/outspokn/id6737053468"
            id="as-h"
          >
            <Image
              src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/appStore_new.png"
              alt="Download from app store"
              fill
            />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
