import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { PiFolderSimpleStarFill } from "react-icons/pi";
import styles from "./Features.module.css";

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.featureItem}>
        <div className={styles.icon}>
          <FaRegCalendarCheck />
        </div>
        <h3>Daily lessons</h3>
        <p>
          Engage in English everyday, about anything. Daily lessons will provide
          structure for a gradual improvement in talking English fluently - with
          confidence.
        </p>
      </div>

      <div className={styles.featureItem}>
        <div className={styles.icon}>
          <LuMessagesSquare />
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
          <PiFolderSimpleStarFill />
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
