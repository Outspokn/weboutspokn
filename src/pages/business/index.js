import BusinessPageWrapper from "@/Components/Business/BusinessPageWrapper/BusinessPageWrapper";
import MainSection from "@/Components/Business/MainContent/MainContent";
import Navbar from "@/Components/Business/Navbar/Navbar";
import PricingSection from "@/Components/Business/PricingSection/PricingSection";
import React from "react";

const index = () => {
  return (
    <div>
    <BusinessPageWrapper>
      <Navbar />
      <MainSection />
    </BusinessPageWrapper>
    <PricingSection/>
    </div>
  );
};

export default index;
