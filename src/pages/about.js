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
          <h2>How It Started</h2>
          <h1>
            Our Dream is <br /> Global Learning Transformation
          </h1>
          <p>
            Kawruh was founded by Robert Anderson, a passionate lifelong
            learner, and Maria Sanchez, a visionary educator. Their shared dream
            was to create a digital haven of knowledge accessible to all. United
            by their belief in the transformational power of education, they
            embarked on a journey to build Kawruh. With relentless dedication,
            they gathered a team of experts and launched this innovative
            platform, creating a global community of eager learners, all
            connected by the desire to explore, learn, and grow.
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
              <h3>3.5</h3>
              <p>Years Experience</p>
            </div>
            <div className={styles.statItem}>
              <h3>23</h3>
              <p>Project Challenge</p>
            </div>
            <div className={styles.statItem}>
              <h3>830+</h3>
              <p>Positive Reviews</p>
            </div>
            <div className={styles.statItem}>
              <h3>100K</h3>
              <p>Trusted Students</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
