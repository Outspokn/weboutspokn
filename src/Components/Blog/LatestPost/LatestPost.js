import React from "react";
import styles from "./LatestPost.module.css";
import Image from "next/image";
import { FaReadme } from "react-icons/fa";
import Link from "next/link";

const LatestPost = ({ posts }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Latest posts...</h2>
        <p>
          Check out our content at a glance. Like what you see? Explore the
          guide to see more.
        </p>
      </div>
      <div className={styles.posts}>
        {posts[0] && (
          <div className={styles.mainPost}>
            <Link
              href={{
                pathname: `/blogPage/${posts[0].id}`,
                query: { tag: posts[0].tag, category: posts[0].category },
              }}
              className={styles.imageLink}
            >
              <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/assets/blog.jpg"
                    alt={posts[0].title}
                    className={styles.postImage}
                    fill
                  />
                </div>
              </div>
            </Link>
            <div className={styles.postDetails}>
              <div className={styles.postContent}>
                <span className={styles.tag}>{posts[0].tag}</span>
                <span className={styles.date}>{posts[0].date}</span>
              </div>
              <h3>{posts[0].title}</h3>
              <p className={styles.desc}>{posts[0].description}</p>
            </div>
          </div>
        )}
        {posts.length > 1 && (
          <div className={styles.sidePosts}>
            {posts.slice(1).map((post, index) => (
              <div className={styles.sidePost} key={index}>
                <Link
                  href={{
                    pathname: `/blogPage/${post.id}`,
                    query: { tag: post.tag },
                  }}
                  className={styles.sideImageLink}
                >
                  <div className={styles.sideImageWrapper}>
                    <Image
                      src="/assets/blog1.jpg"
                      alt={post.title}
                      className={styles.sidePostImage}
                      fill
                    />
                  </div>
                </Link>
                <div className={styles.sidePostDetails}>
                  <div className={styles.sidePostContent}>
                    <span className={styles.tag}>{post.tag}</span>
                    <span className={styles.readTime}>
                      <FaReadme className={styles.readIcon} />
                      {post.readTime} read
                    </span>
                  </div>
                  <h4>{truncateText(post.title, 80)}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestPost;
