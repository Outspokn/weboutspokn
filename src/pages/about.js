import React from "react";
import styles from "../styles/about.module.css";
import Image from "next/image";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";

const about = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h2>Outspokn</h2>
          <h1>Empowering Your Journey in Language Mastery</h1>
          <p>
            Communication: the first, fundamental skill we master in life. In
            the vibrant tapestry of today’s global village, fluency in English
            is not just an asset but a necessity, bridging cultures and
            fostering collaborations across continents. At the heart of our
            mission, we stand as your trusted guide in mastering English,
            transforming basic skills into confident, fluent expression akin to
            that of a native speaker. Our innovative digital solutions are
            designed to accelerate your learning journey, making fluency
            attainable, enjoyable, and profoundly impactful.
          </p>
        </div>
        <div className={styles.rightContainer}>
          <Image
            src="/assets/laptop.jpg"
            alt="Team Collaboration"
            width={500}
            height={300}
            layout="fixed"
            className={styles.image}
          />

          <div className={styles.lowerContainer}>
            <div className={styles.statItem}>
              <h3>5,000+</h3>
              <p>Total registered users</p>
            </div>
            <div className={styles.statItem}>
              <h3>80%</h3>
              <p>Course Completion Rate</p>
            </div>
            <div className={styles.statItem}>
              <h3>30 minutes</h3>
              <p>Average Daily Session Length</p>
            </div>
            <div className={styles.statItem}>
              <h3>100+</h3>
              <p>Native language support</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
