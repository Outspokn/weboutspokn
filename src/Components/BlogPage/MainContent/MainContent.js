import React from "react";
import styles from "./MainContent.module.css";
import { IoBookmark } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import Image from "next/image";

const MainContent = ({ post, relatedPosts, onRelatedPostClick }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  if (!post) return <p>Post not found!</p>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.imgWrapper}>
              <Image
                src={post.imageSrc || "/assets/blog3.png"}
                alt={post.title}
                width={600}
                height={400}
                className={styles.articleImage}
              />
            </div>
            <div className={styles.articleContentContainer}>
              <div className={styles.articleContent}>
                <div className={styles.iconTextContainer}>
                  <div className={styles.articleTxt}>
                    <div>
                      <span className={styles.category}>{post.tag}</span>
                      <span className={styles.date}>{post.date}</span>
                    </div>
                    <div className={styles.articleIconContainer}>
                      <IoBookmark className={styles.articleIcon} />
                      <FaShare className={styles.articleIcon} />
                    </div>
                  </div>
                  <h1 className={styles.title}>{post.title}</h1>
                  <p className={styles.blogDesc}>{post.desc}</p>
                  <article
                    className={styles.articleBody}
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <aside className={styles.sidebar}>
            {relatedPosts.map((relatedPost, index) => (
              <div
                className={styles.card}
                key={index}
                onClick={() => onRelatedPostClick(relatedPost, index)}
              >
                <div className={styles.imgWrapperSide}>
                  <Image
                    src={relatedPost.imageSrc || "/assets/blog4.jpg"}
                    alt={relatedPost.title}
                    width={250}
                    height={150}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.info}>
                    <h4 className={styles.relatedPostTag}>{relatedPost.tag}</h4>
                    <span>{relatedPost.date}</span>
                  </div>
                  <h4 className={styles.relatedTitle}>{relatedPost.title}</h4>
                  <p className={styles.description}>
                    {truncateText(relatedPost.desc, 72)}
                  </p>
                  <div className={styles.iconContainerRight}>
                    <IoBookmark className={styles.iconRight} />
                    <FaShare className={styles.iconRight} />
                  </div>
                </div>
              </div>
            ))}
          </aside>
        )}
      </main>
    </div>
  );
};

export default MainContent;
