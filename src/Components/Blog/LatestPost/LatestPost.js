import React from "react";
import styles from "./LatestPost.module.css";
import Image from "next/image";

const LatestPost = () => {
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
        <div className={styles.mainPost}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/blog.jpg"
                alt="Post Image"
                className={styles.postImage}
                fill
              />
            </div>
          </div>
          <div className={styles.postDetails}>
            <div className={styles.postContent}>
              <span className={styles.tag}>Business Growth</span>
              <span className={styles.date}>Aug 5, 2024</span>
            </div>
            <h3>How to Maximize Your Agency Profit Margins</h3>
            <p>
              Whether you choose to track your time via paper timesheets,
              spreadsheets, a swipe-card system..
            </p>
          </div>
        </div>
        <div className={styles.sidePosts}>
          <div className={styles.sidePost}>
            <div className={styles.sideImageWrapper}>
              <Image
                src="/assets/blog1.jpg"
                alt="Side Post Image"
                className={styles.sidePostImage}
                fill
              />
            </div>
            <div className={styles.sidePostDetails}>
              <div className={styles.sidePostContent}>
                <span className={styles.tag}>Product News</span>
                <span className={styles.readTime}>7 min read</span>
              </div>

              <h4>NEW! Introducing Homeworks to Assessment Library</h4>
            </div>
          </div>
          <div className={styles.sidePost}>
            <div className={styles.sideImageWrapper}>
              <Image
                src="/assets/blog1.jpg"
                alt="Side Post Image"
                className={styles.sidePostImage}
                fill
              />
            </div>
            <div className={styles.sidePostDetails}>
              <div className={styles.sidePostContent}>
                <span className={styles.tag}>Project Management</span>
                <span className={styles.readTime}>17 min read</span>
              </div>

              <h4>What is Scope Creep? Common Causes & How to Avoid Them</h4>
            </div>
          </div>
          <div className={styles.sidePost}>
            <div className={styles.sideImageWrapper}>
              <Image
                src="/assets/blog1.jpg"
                alt="Side Post Image"
                className={styles.sidePostImage}
                fill
              />
            </div>
            <div className={styles.sidePostDetails}>
              <div className={styles.sidePostContent}>
                <span className={styles.tag}>Product News</span>
                <span className={styles.readTime}>15 min read</span>
              </div>
              <h4>8 Examples of Using ChatGPT in Recruitment Process</h4>
            </div>
          </div>
          <div className={styles.sidePost}>
            <div className={styles.sideImageWrapper}>
              <Image
                src="/assets/blog1.jpg"
                alt="Side Post Image"
                className={styles.sidePostImage}
                fill
              />
            </div>
            <div className={styles.sidePostDetails}>
              <div className={styles.sidePostContent}>
                <span className={styles.tag}>Product News</span>
                <span className={styles.readTime}>15 min read</span>
              </div>
              <h4>8 Examples of Using ChatGPT in Recruitment Process</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPost;
