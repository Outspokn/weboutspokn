import React, { useRef, useEffect } from "react";
import styles from "./MainContent.module.css";
import { IoBookmark } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import Image from "next/image";

const MainContent = ({ post }) => {
  const contentRefs = useRef([]);
  const articleRef = useRef(null);

  const scrollToSection = (index) => {
    const element = contentRefs.current[index + 1];
    const articleElement = articleRef.current;

    if (element && articleElement) {
      articleElement.scrollTo({
        top:
          articleElement.scrollTop + element.getBoundingClientRect().top - 90,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    contentRefs.current = document.querySelectorAll("h2,h3");
  }, [post]);

  if (!post) return <p>Post not found!</p>;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>Table of Contents</h3>
        <ul className={styles.tocList}>
          {post?.table?.map((item, index) => (
            <li
              key={index}
              className={styles.tocItem}
              onClick={() => scrollToSection(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.main} ref={articleRef}>
        <article className={styles.article}>
          <div className={styles.imgWrapper}>
            <Image
              src={post.headerImg || "/assets/blog3.png"}
              alt={post.title}
              width={600}
              height={400}
              className={styles.articleImage}
            />
          </div>
          <div className={styles.articleHeader}>
            <div className={styles.articleContentContainer}>
              <div className={styles.articleContent}>
                <div className={styles.iconTextContainer}>
                  <div className={styles.articleTxt}>
                    <div className={styles.articleInfo}>
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
                  <div className={styles.articleContentWrapper}>
                    <div
                      className={styles.articleBody}
                      dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                  </div>
                  <div className={styles.articleFooter}>
                    <IoBookmark className={styles.iconFooter} />
                    <FaShare className={styles.iconFooter} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MainContent;
