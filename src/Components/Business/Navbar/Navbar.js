import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>Outspokn</div>
      <div className={styles.businessLink}>OUTSPOKN FOR BUSINESS</div>
    </header>
  );
};

export default Navbar;
