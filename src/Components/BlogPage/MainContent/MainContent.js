import React from "react";
import styles from "./MainContent.module.css";
import { IoBookmark } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const MainContent = ({ post, relatedPosts }) => {
  console.log(post.body, "post");

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
                  <div className={styles.articleIconContainer}>
                    <IoBookmark className={styles.articleIcon} />
                    <FaShare className={styles.articleIcon} />
                  </div>
                  <div className={styles.articleTextGroup}>
                    <span className={styles.articleViews}>{post.views}</span>
                    <span className={styles.articleText}>People saw</span>
                  </div>
                </div>
                <div className={styles.blogWrap}>
                  <div className={styles.articleTxt}>
                    <span className={styles.category}>{post.tag}</span>
                    <span className={styles.date}>{post.date}</span>
                  </div>
                  <article dangerouslySetInnerHTML={{ __html: post.body }} />
                  {/* <h1 className={styles.title}>{post.title}</h1>
                  <p className={styles.text}>
                    <span className={styles.firstLetter}>
                      {post.desc?.charAt(0) || ""}
                    </span>
                    {post.desc?.slice(1) || "Content not available."}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </article>
        {relatedPosts.length > 0 && (
          <aside className={styles.sidebar}>
            {relatedPosts.map((relatedPost, index) => (
              <div className={styles.card} key={index}>
                <Link href={`/blogPage/${relatedPost.id}`}>
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
                      <h4 className={styles.relatedPostTag}>
                        {relatedPost.tag}
                      </h4>
                      <span>{relatedPost.date}</span>
                    </div>
                    <h4 className={styles.relatedTitle}>{relatedPost.title}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </aside>
        )}
      </main>
    </div>
  );
};

export default MainContent;
