import React from "react";
import styles from "./PricingSection.module.css";
import Link from "next/link";

const PricingSection = () => {
  return (
    <div className={styles.pricingWrapper}>
      <div className={styles.pricingContainer}>
        <div className={styles.plan}>
          <div className={styles.planHeader}>
            <h3>DREAM TEAM</h3>
            <p className={styles.memberCount}>3-499 members</p>
          </div>
          <div className={styles.planContent}>
            <p className={styles.price}>
              <span className={styles.currency}>$</span>10
              <span className={styles.perMonth}> / member per month</span>
            </p>
            <p className={styles.description}>
              Annual billing, more plans available.
            </p>
          </div>
          <div className={styles.horizontalLine}></div>
          <ul className={styles.features}>
            <li>Unlimited Outspokn access</li>
            <li>Custom role-playing</li>
            <li>Management console</li>
            <li>Customer support</li>
          </ul>
          <button className={styles.getStartedButton}>Get Started</button>
        </div>
        <div className={styles.plan}>
          <div className={styles.planHeader}>
            <h3>ENTERPRISE</h3>
            <p className={styles.memberCount}>500+ members</p>
          </div>
          <div className={styles.planContent}>
            <p className={styles.contact}>
              <Link href="#">Contact us</Link> for Enterprise plan pricing.
            </p>
          </div>
          <div className={styles.horizontalLine}></div>
          <ul className={styles.features}>
            <li>Unlimited Outspokn access</li>
            <li>Custom role-playing</li>
            <li>Management console</li>
            <li>Customer support</li>
            <li>Virtual onboarding sessions</li>
            <li>Dedicated account management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
