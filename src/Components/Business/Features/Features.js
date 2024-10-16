import React from "react";
import { MdCalendarToday } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import styles from "./Features.module.css";

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.featureItem}>
        <div className={styles.icon}>
          <MdCalendarToday size={50} />
        </div>
        <h3>Daily lessons</h3>
        <p>
          Engage in English everyday, about anything. Daily lessons will
          provide structure for a gradual improvement in talking English
          fluently - with confidence.
        </p>
      </div>

      <div className={styles.featureItem}>
        <div className={styles.icon}>
          <FaComments size={50} />
        </div>
        <h3>Custom scenarios</h3>
        <p>
          Practice any scenario—be it business meetings, job interviews, or
          friendly chats—and witness your employees' fluency thrive where it
          truly matters: for you.
        </p>
      </div>

      <div className={styles.featureItem}>
        <div className={styles.icon}>
          <BsStarFill size={50} />
        </div>
        <h3>Real-time feedback</h3>
        <p>
          Maximize your potential with real-time feedback. Perfect
          pronunciation, fix grammar, embrace rephrasing, and enhance your
          accent. Thrive on continuous improvement.
        </p>
      </div>
    </section>
  );
};

export default Features;
