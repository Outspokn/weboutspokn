import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Thankyou.module.css";
import Navbar from "@/Components/Navbar/Navbar";
import ValidUserPage from "@/Components/ThankYou/ValidUserPage";

const ThankYou = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from query parameters
  const [isValidUser, setIsValidUser] = useState(false); // null, true, or false
  const [os, setOs] = useState("");

  useEffect(() => {
    // Function to detect the operating system
    function detectOS() {
      const platform = window.navigator.platform.toLowerCase();
      if (platform.includes("mac")) return "MacOS";
      if (platform.includes("win")) return "Windows";
      if (platform.includes("linux")) return "Linux";
      if (/android/i.test(platform)) return "Android";
      if (/iphone|ipad|ipod/i.test(platform)) return "iOS";
      return "unknown";
    }

    setOs(detectOS());
  }, []);

  //   useEffect(() => {
  //     const verifyUser = async () => {
  //       if (id) {
  //         try {
  //           // Example: API call to verify the user
  //           const response = await fetch(`/api/verify?id=${id}`);
  //           const data = await response.json();
  //           if (data.success) {
  //             setIsValidUser(true);
  //           } else {
  //             setIsValidUser(false);
  //           }
  //         } catch (error) {
  //           console.error("Failed to verify user:", error);
  //           setIsValidUser(false);
  //         }
  //       }
  //     };

  //     verifyUser();
  //   }, [id]);

  if (isValidUser === null) {
    return <div className={styles.loading}>Loading...</div>; // Or some other loading indicator
  }

  if (!isValidUser) {
    return (
      <div className={styles.inavalidWrapper}>
        <Navbar />
        <ValidUserPage valid={false} os={os} />
      </div>
    );
  }

  return (
    <div className={styles.thankWrapper}>
      <Navbar />
      <ValidUserPage valid={true} os={os} />
    </div>
  );
};

export default ThankYou;
