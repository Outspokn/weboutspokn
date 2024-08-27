import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import dynamic from "next/dynamic";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/utils/auth";
import { useRouter } from "next/router"; // Import useRouter from next/router

const Login = () => {
  const router = useRouter(); // Use useRouter hook to get the router object
  const { id } = router.query; // Destructure the 'id' parameter from the router's query object

  useEffect(() => {
    console.log("Center ID:", id); // Log the ID to verify it's being fetched correctly
  }, [id]); // Ensure this runs whenever the 'id' changes

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("User Data:", result.user);
      // Redirect or perform additional actions
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>
          Learn English faster using conversations
        </h1>
        <button className={styles.googleBtn} onClick={handleLogin}>
          <FcGoogle style={{ fontSize: "25px" }} /> Continue With Google
        </button>
        {id && <p>Center ID: {id}</p>}{" "}
        {/* Optionally display the ID on the page */}
      </div>
    </div>
  );
};

export default Login;
