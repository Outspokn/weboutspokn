import Image from "next/image";
import styles from "./Card.module.css";
import { FaCalendarAlt, FaEye } from "react-icons/fa";

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
        <div className={styles.authorBadge}>
          <Image
            src={data?.authorImage}
            alt={data?.author}
            width={40}
            height={40}
            className={styles.authorImage}
          />
          <span>{data?.author}</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3>{data?.title}</h3>
        <p className={styles.description}>{data?.description}</p>
        <div className={styles.cardFooter}>
          <FaCalendarAlt className={styles.icon} />
          <span>{data?.date}</span>
          <span className={styles.verticalLine}></span>
          <FaEye className={styles.icon} />
          <span>{data?.viewers}</span>
        </div>
        <button className={styles.readMore}>Read More</button>
      </div>
    </div>
  );
};

export default Card;
