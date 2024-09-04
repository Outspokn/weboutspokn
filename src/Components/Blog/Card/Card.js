import Image from "next/image";
import styles from "./Card.module.css";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import Link from "next/link";

const Card = ({ post }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <Link
      href={{
        pathname: `/blogPage/${post?.id}`,
        query: { tag: post?.tag },
      }}
      className={styles.cardLink}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/blog2.jpg"
            alt={post?.title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3>{truncateText(post?.title, 80)}</h3>
          <p className={styles.description}>{truncateText(post?.desc, 100)}</p>
          <div className={styles.cardFooter}>
            <span className={styles.inSpanWrap}>
              <FaCalendarAlt className={styles.icon} />
              <span>{post?.date}</span>
            </span>
            <span className={styles.verticalLine}></span>
            <span className={styles.inSpanWrap}>
              <FaUserAlt className={styles.icon} />
              <span>{post?.author}</span>
            </span>
          </div>
          <button className={styles.readMore}>Read More</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
