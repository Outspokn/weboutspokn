import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase"; // Make sure this imports correctly from your firebase.js

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result, "from auth");

    // You can extract more user information here if necessary
    return result;
  } catch (error) {
    console.error("Auth error:", error);
    throw error;
  }
};
