import BusinessPageWrapper from "@/Components/Business/BusinessPageWrapper/BusinessPageWrapper";
import Features from "@/Components/Business/Features/Features";
import MainSection from "@/Components/Business/MainContent/MainContent";
import Navbar from "@/Components/Business/Navbar/Navbar";
import PricingSection from "@/Components/Business/PricingSection/PricingSection";
import ProductHighlight from "@/Components/Business/ProductHighlight/ProductHighlight";
import React from "react";

const index = () => {
  return (
    <div>
      <BusinessPageWrapper>
        <Navbar />
        <MainSection />
      </BusinessPageWrapper>
      <PricingSection />
      <Features />
      <ProductHighlight />
    </div>
  );
};

export default index;
