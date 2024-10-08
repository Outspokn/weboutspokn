import React from "react";
import styles from "./Footer.module.css";
import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { MdMail, MdCall } from "react-icons/md";
// import { FaAndroid } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.firstFooter}>
        <div className={styles.iconWrapper}>
          <Link
            href="/"
            className={styles.logo}
            style={{ cursor: "pointer" }}
            aria-label="Go to the Home Page of Outspokn"
          >
            <Image
              src="https://outspoknweb.s3.us-east-2.amazonaws.com/Outspokn-logo-new.png"
              alt="outspokn"
              quality={100}
              style={{ objectFit: "contain" }}
              width={180}
              height={41}
              loading="lazy"
            />
          </Link>
          <p className={styles.desc}>Accelerated language learning</p>
          <div className={styles.followRow}>
            <h5>Follow us!</h5>
            <div className={styles.sIcon}>
              <Link
                href="https://www.facebook.com/profile.php?id=61561944704188"
                target="_blank"
                aria-label="Go to the facebook page of Outspokn"
              >
                <FaMeta className={styles.FIcon} />
              </Link>
              <Link
                href="https://www.instagram.com/outspokn.ai"
                target="_blank"
                aria-label="Go to the Instagram of Outspokn"
              >
                <FaInstagram className={styles.FIcon} />
              </Link>
              <Link
                href="https://www.youtube.com/@Outspokn_app"
                target="_blank"
                aria-label="Go to the Youtube of Outspokn"
              >
                <FaYoutube className={styles.FIcon} />
              </Link>
              <Link
                href="https://x.com/Outspokn_app"
                target="_blank"
                aria-label="Go to the Twitter Page of Outspokn"
              >
                <FaXTwitter className={styles.FIcon} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/outspokn/"
                target="_blank"
                aria-label="Go to the Linkedin Page of Outspokn"
              >
                <FaLinkedinIn className={styles.FIcon} />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.fPages}>
          <h5>Pages</h5>
          <Link href="/about">
            <p>About</p>
          </Link>
          <Link href="/blog">
            <p>Blog</p>
          </Link>
          <Link href="/contact">
            <p>Contact</p>
          </Link>
        </div>
        <div className={styles.FJoin}>
          <div className={styles.terms}>
            <h5>Terms & condition</h5>
            <Link href="/terms-of-use">
              <span>Terms of Use</span>
            </Link>
            <Link href="/privacy-statement">
              <span>Privacy Policy</span>
            </Link>
            <Link href="/refunds-cancellation">
              <span>Refund Policy</span>
            </Link>
          </div>
        </div>
        <div className={styles.FApp}>
          <div className={styles.googlePlayStore}>
            <Link href="https://play.google.com/store/apps/details?id=com.outspokn">
              <Image
                src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/GooglePlayStore.png"
                alt="Download from play store"
                fill
              />
            </Link>
          </div>
          <div className={styles.googlePlayStore}>
            <Image
              src="https://outspoknweb.s3.us-east-2.amazonaws.com/header/appStore_new.png"
              alt="Download from app store"
              fill
            />
          </div>
          <Link
            href="mailto:support@outspokn.co"
            aria-label="mail your queries"
          >
            <p>
              <MdMail className="FIcon" />
              support@outspokn.co
            </p>
          </Link>
        </div>
      </div>
      <hr />
      <p className={styles.rights}>
        © 2024 – LinguaQuest Technology Private Limited. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
