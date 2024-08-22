import Header from "@/Components/BlogPage/Header/Header";
import MainContent from "@/Components/BlogPage/MainContent/MainContent";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";

const index = () => {
  return (
    <div>
      <Navbar />
npm run devops      <Header />
      <MainContent />
    </div>
  );
};

export default index;
