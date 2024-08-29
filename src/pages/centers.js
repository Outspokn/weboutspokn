import Footer from "@/Components/Footer/Footer";
import Login from "@/Components/Login/Login";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";

const center = () => {
  return (
    <div>
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
};

export default center;
