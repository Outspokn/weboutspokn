import React, { useRef, useEffect } from "react";
import styles from "./MainContent.module.css";
import { IoLogoWhatsapp } from "react-icons/io5";
import Image from "next/image";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const MainContent = ({ post }) => {
  const contentRefs = useRef([]);
  const articleRef = useRef(null);

  const scrollToSection = (index) => {
    const element = contentRefs.current[index + 1];
    const articleElement = articleRef.current;

    if (element && articleElement) {
      articleElement.scrollTo({
        top:
          articleElement.scrollTop + element.getBoundingClientRect().top - 60,
        behavior: "smooth",
      });
    }
  };

  // useEffect(() => {
  //   contentRefs.current = document.querySelectorAll("h2,h3");
  // }, [post]);

  if (!post) return <p>Post not found!</p>;

  // const shareUrls = {
  //   whatsapp: `https://wa.me/?text=${encodeURIComponent(
  //     post.title
  //   )}%20${encodeURIComponent(window.location.href)}`,
  //   twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  //     window.location.href
  //   )}&text=${encodeURIComponent(post.title)}`,
  //   linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  //     window.location.href
  //   )}`,
  //   meta: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //     window.location.href
  //   )}`,
  // };

  return (
    <div className={styles.container}>
      <div className={styles.sideContainer}>
      <div className={styles.sidebar}>
        <h3>Table of Contents</h3>
        <ul className={styles.tocList}>
          {post?.table?.map((item, index) => {
            const removeSpecial = item.replace(
              /[&\/\\#,+()$~%.'":*?<>{}]/g,
              ""
            );

            const uMake = removeSpecial.toLowerCase().replace(/\s+/g, "-");
            const url = `#${uMake}`;

            return (
              <Link href={url}>
                <li
                  key={index}
                  className={styles.tocItem}
                  // onClick={() => scrollToSection(index)}
                >
                  {item}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
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
                      {/* <FaMeta
                        className={`${styles.articleIcon} ${styles.meta}`}
                      /> */}
                      {/* <FaXTwitter
                        className={`${styles.articleIcon} ${styles.twitter}`}
                      />
                      <FaLinkedinIn
                        className={`${styles.articleIcon} ${styles.linkedin}`}
                      /> */}
                      {/* <IoLogoWhatsapp
                        className={`${styles.articleIcon} ${styles.whatsapp}`}
                      /> */}
                      {/* <a
                        href={shareUrls.meta}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaMeta
                          className={`${styles.articleIcon} ${styles.meta}`}
                        />
                      </a>
                      <a
                        href={shareUrls.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoLogoWhatsapp
                          className={`${styles.articleIcon} ${styles.whatsapp}`}
                        />
                      </a>
                      <a
                        href={shareUrls.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaXTwitter
                          className={`${styles.articleIcon} ${styles.twitter}`}
                        />
                      </a>
                      <a
                        href={shareUrls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedinIn
                          className={`${styles.articleIcon} ${styles.linkedin}`}
                        />
                      </a> */}
                    </div>
                  </div>
                  <h1 className={styles.title}>{post.title}</h1>
                  <p className={styles.blogDesc}>{post.desc}</p>
                  <div className={styles.articleContentWrapper}>
                    <article
                      className={styles.articleBody}
                      dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                  </div>
                  <div className={styles.articleFooter}>
                    {/* <FaMeta
                      className={`${styles.articleIcon} ${styles.meta}`}
                    />
                    <IoLogoWhatsapp
                      className={`${styles.articleIcon} ${styles.whatsapp}`}
                    />
                    <FaXTwitter
                      className={`${styles.articleIcon} ${styles.twitter}`}
                    />
                    <FaLinkedinIn
                      className={`${styles.articleIcon} ${styles.linkedin}`}
                    /> */}
                      {/* <a href={shareUrls.meta} target="_blank" rel="noopener noreferrer">
                        <FaMeta className={`${styles.articleIcon} ${styles.meta}`} />
                      </a>
                      <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
                        <IoLogoWhatsapp className={`${styles.articleIcon} ${styles.whatsapp}`} />
                      </a>
                      <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className={`${styles.articleIcon} ${styles.twitter}`} />
                      </a>
                      <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className={`${styles.articleIcon} ${styles.linkedin}`} />
                      </a> */}
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
