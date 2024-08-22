import React from "react";
import styles from "./MainContent.module.css";
import { IoBookmark } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import Image from "next/image";

const MainContent = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.articleHeader}>
            <Image
              src="/assets/blog3.png"
              alt="Travel Image"
              width={700}
              height={400}
              className={styles.articleImage}
            />
            <div className={styles.articleContentContainer}>
              <div className={styles.articleContent}>
                <div className={styles.iconTextContainer}>
                  <div className={styles.iconContainer}>
                    <IoBookmark className={styles.icon} />
                    <FaShare className={styles.icon} />
                  </div>
                  <div className={styles.textGroup}>
                    <span className={styles.views}>25 123</span>
                    <span className={styles.text}>People saw</span>
                  </div>
                </div>
                <span className={styles.category}>Travel</span>
                <span className={styles.date}>20 Aug 2024</span>
                <h1 className={styles.title}>
                  Five easy way how you can travel cheap and safe
                </h1>
                <p className={styles.text}>
                  <span className={styles.firstLetter}>T</span>raveling is more
                  than just a break from routine—it's a transformative
                  experience that broadens your perspective, fuels creativity,
                  and fosters personal growth. As you explore new cultures and
                  environments, you gain a deeper understanding of the world and
                  yourself. Each journey is a step outside your comfort zone,
                  offering opportunities to learn, connect, and create lasting
                  memories. Whether you're seeking adventure or relaxation,
                  travel enriches your life, making it not just useful and
                  interesting, but essential for a well-rounded, fulfilling
                  life.
                </p>
              </div>
            </div>
          </div>
        </article>
        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <Image
              src="/assets/blog4.jpg"
              alt="Best Place"
              width={250}
              height={150}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <div className={styles.info}>
                <h4>Place</h4>
                <span>24 Aug 2024</span>
              </div>
              <h3>Tahiti is place paradise in the earth</h3>
              <p>
                Tahiti is the largest island in French Polynesia, the South
                Pacific archipelogo
              </p>
              <div className={styles.stats}>
                <div className={styles.textGroup}>
                  <span className={styles.views}>25 123</span>
                  <span className={styles.text}>People saw</span>
                </div>
                <div className={styles.iconContainer}>
                  <IoBookmark className={styles.icon} />
                  <FaShare className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/blog4.jpg"
              alt="Best Place"
              width={250}
              height={150}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <div className={styles.info}>
                <h4>Place</h4>
                <span>24 Aug 2024</span>
              </div>
              <h3>Tahiti is place paradise in the earth</h3>
              <p>
                Tahiti is the largest island in French Polynesia, the South
                Pacific archipelogo
              </p>
              <div className={styles.stats}>
                <div className={styles.textGroup}>
                  <span className={styles.views}>25 123</span>
                  <span className={styles.text}>People saw</span>
                </div>
                <div className={styles.iconContainer}>
                  <IoBookmark className={styles.icon} />
                  <FaShare className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/blog4.jpg"
              alt="Best Place"
              width={250}
              height={150}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <div className={styles.info}>
                <h4>Place</h4>
                <span>24 Aug 2024</span>
              </div>
              <h3>Tahiti is place paradise in the earth</h3>
              <p>
                Tahiti is the largest island in French Polynesia, the South
                Pacific archipelogo
              </p>
              <div className={styles.stats}>
                <div className={styles.textGroup}>
                  <span className={styles.views}>25 123</span>
                  <span className={styles.text}>People saw</span>
                </div>
                <div className={styles.iconContainer}>
                  <IoBookmark className={styles.icon} />
                  <FaShare className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default MainContent;
