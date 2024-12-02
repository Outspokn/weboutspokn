import React from "react";
import styles from "./BusinessPageWrapper.module.css";

const BusinessPageWrapper = ({ children }) => {
  return <div className={styles.businessWrapper}>{children}</div>;
};

export default BusinessPageWrapper;
