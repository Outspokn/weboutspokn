import Head from "next/head";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Pricing from "@/Components/Pricing/Pricing";

export default function Home() {
  return (
    <div>
      <Navbar />
 <Pricing />
      <Footer />
      
    </div>
  );
}
