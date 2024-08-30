import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/utils/auth";
import ValidUserPage from "../ThankYou/ValidUserPage";
// Assuming you have a ThankYou component

const Login = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isValid, setIsValid] = useState(null);
  const [showThankyou, setShowThankyou] = useState(false);
  const [InstituteName, setInstituteName] = useState(null);
  const [username, setUserName] = useState(null);

  useEffect(() => {
    console.log("Center ID:", id);
    const verifyCenter = async () => {
      try {
        const apiResponse = await fetch(
          `https://api.outspokn.ai/users/verify_center/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ center_hashid: id }),
          }
        );
        const checkStatus = await apiResponse.json();
        console.log(checkStatus, "cehck the auth");

        if (checkStatus.status === true) {
          setIsValid(true);
          setInstituteName(checkStatus.data.center_name);
          checkAuthState(); // Check auth state only after ID verification is successful
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error verifying center ID:", error);
        setIsValid(false);
      }
    };

    if (id) {
      verifyCenter();
    }
  }, [id]);

  const checkAuthState = () => {
    const key = localStorage.getItem("authKey");
    if (key) {
      const keyObj = JSON.parse(key);
      if (new Date().getTime() < keyObj.validUntil) {
        setShowThankyou(true); // Set to show ThankYou if token is still valid
      }
    }
  };

  const handleLogin = async () => {
    if (!isValid) return; // Prevent login if ID is not valid

    try {
      const result = await signInWithGoogle();
      console.log("User Data:", result.user.displayName);
      setUserName(result.user.displayName);
      const apiResponse = await fetch(
        `https://api.outspokn.ai/users/register_center_user/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            center_hashid: id,
            googleData: result,
          }),
        }
      );
      const check = await apiResponse.json();
      console.log(apiResponse, check, "from login");

      if (apiResponse.ok) {
        const key = { validUntil: new Date().getTime() + 30 * 60 * 1000 };
        localStorage.setItem("authKey", JSON.stringify(key));
        localStorage.setItem("intituteName", JSON.stringify(key));
        setShowThankyou(true);
        console.log(setShowThankyou);
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <div className={styles.invalidWrapper}>Invalid User</div>;
  }

  if (showThankyou) {
    return (
      <ValidUserPage valid={true} name={InstituteName} username={username} />
    );
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>Signup for {InstituteName}</h1>
        <p className={styles.desc}>Learn English faster using conversations</p>
        <button className={styles.googleBtn} onClick={handleLogin}>
          <FcGoogle style={{ fontSize: "25px" }} /> Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
