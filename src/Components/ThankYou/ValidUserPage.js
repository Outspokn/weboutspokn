import React from "react";
import styles from "./ValidUserPage.module.css";

const ValidUserPage = ({ valid, os }) => {
  return (
    <div className={styles.validWrapper}>
      <div className={styles.leftside}>
        <h1>
          Welcome <span>Somnath</span> from <span>Skillslash</span> Institute
        </h1>
        <p>Download our Application</p>
        <div>
          <div></div>
        </div>
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
};

export default ValidUserPage;
