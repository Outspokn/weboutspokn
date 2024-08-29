import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/utils/auth";

const Login = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("Center ID:", id);
    const getData = async () => {
      const apiResponse = await fetch(
        `${process.env.api_endpoint}/users/verify_center/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            center_hashid: id,
          }),
        }
      );
    };
  }, [id]);

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("User Data:", result.user);
      const apiResponse = await fetch(
        `${process.env.api_endpoint}/users/register_center_user/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            center_hashid: "",
            googleData: result,
          }),
        }
      );

      const apiResult = await apiResponse.json();

      // Step 3: Check the response from your API
      if (apiResponse.ok) {
        // Set key in localStorage that expires in 30 minutes
        const key = { validUntil: new Date().getTime() + 30 * 60 * 1000 };
        localStorage.setItem("authKey", JSON.stringify(key));

        // Redirect to ThankYou page
        router.push(`/thankyou?id=${id}`);
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>Signup for Skillslash Institute</h1>
        <p className={styles.desc}>Learn English faster using conversations</p>
        <button className={styles.googleBtn} onClick={handleLogin}>
          <FcGoogle style={{ fontSize: "25px" }} /> Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
