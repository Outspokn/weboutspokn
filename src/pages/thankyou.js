import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Thankyou.module.css";
import Navbar from "@/Components/Navbar/Navbar";
import ValidUserPage from "@/Components/ThankYou/ValidUserPage";

const ThankYou = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isValidUser, setIsValidUser] = useState(null);

  useEffect(() => {
    const key = localStorage.getItem("authKey");
    if (key) {
      const keyObj = JSON.parse(key);
      if (new Date().getTime() > keyObj.validUntil) {
        localStorage.removeItem("authKey");
        setIsValidUser(false);
      } else {
        setIsValidUser(true);
      }
    } else {
      setIsValidUser(false);
    }
  }, []);

  if (isValidUser === null) {
    return <div>Loading...</div>;
  }
  if (!isValidUser) {
    return (
      <div className={styles.inavalidWrapper}>
        <Navbar />
        <ValidUserPage valid={false} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <ValidUserPage valid={true} />
    </div>
  );
};

export default ThankYou;
