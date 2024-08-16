import Image from "next/image";
import styles from "./Card.module.css";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";

const Card = ({ data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={data?.image}
          alt={data?.title}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3>{data?.title}</h3>
        <p className={styles.description}>{data?.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.inSpanWrap}>
            <FaCalendarAlt className={styles.icon} />
            <span>{data?.date}</span>
          </span>
          <span className={styles.verticalLine}></span>
          <span className={styles.inSpanWrap}>
            <FaUserAlt className={styles.icon} />

            <span>{data?.author}</span>
          </span>
        </div>
        <button className={styles.readMore}>Read More</button>
      </div>
    </div>
  );
};

export default Card;
