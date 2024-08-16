import React from "react";
import styles from "./Footer.module.css";
import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { MdMail, MdCall } from "react-icons/md";
import { FaAndroid } from "react-icons/fa";
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
            aria-label="Go to the Home Page of skillslash"
          >
            <Image
              src="https://outspokn-fr.s3.us-east-2.amazonaws.com/Outspokn-web/Outspokn-logo-new.png"
              alt="outspokn"
              quality={100}
              style={{ objectFit: "contain" }}
              width={210}
              height={60}
              loading="lazy"
            />
          </Link>
          <p className={styles.desc}>Accelerated language learning</p>
          <div className={styles.followRow}>
            <h5>Follow us!</h5>
            <div className={styles.sIcon}>
              <a
                href="https://www.facebook.com/SkillSlash-100623872122442"
                target="_blank"
                aria-label="Go to the facebook page of skillslash"
              >
                <FaMeta className={styles.FIcon} />
              </a>
              <a
                href="https://www.instagram.com/skillslash_Academy/"
                target="_blank"
                aria-label="Go to the Instagram of skillslash"
              >
                <FaInstagram className={styles.FIcon} />
              </a>
              <a
                href="https://www.youtube.com/c/Skillslash"
                target="_blank"
                aria-label="Go to the Youtube of skillslash"
              >
                <FaYoutube className={styles.FIcon} />
              </a>
              <a
                href="https://twitter.com/skillslash"
                target="_blank"
                aria-label="Go to the Twitter Page of skillslash"
              >
                <FaXTwitter className={styles.FIcon} />
              </a>
              <a
                href="https://www.linkedin.com/company/skillslash"
                target="_blank"
                aria-label="Go to the Linkedin Page of skillslash"
              >
                <FaLinkedinIn className={styles.FIcon} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.fPages}>
          <h5>Pages</h5>
          <Link href="/event">
            <p>Events</p>
          </Link>
          <Link href="/About">
            <p>About</p>
          </Link>
          <a href="/blog">
            <p>Blog</p>
          </a>
          <Link href="/Contact-us">
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
      <p className={styles.rights}>© 2024 – Outspokn. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
