import React, { useRef, useEffect, useState } from "react";
import styles from "./MainContent.module.css";
import { IoLogoWhatsapp } from "react-icons/io5";
import Image from "next/image";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const MainContent = ({ post }) => {
  const contentRefs = useRef([]);
  const articleRef = useRef(null);
  const [shareUrls, setShareUrls] = useState({});

  useEffect(() => {
    if (post && typeof window !== "undefined") {
      const currentUrl = `${window.location.origin}${window.location.pathname}`;

      setShareUrls({
        whatsapp: `https://wa.me/?text=${encodeURIComponent(
          post.title
        )}%20${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(post.title)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          currentUrl
        )}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(
          post.desc
        )}&source=${encodeURIComponent(window.location.hostname)}`,

        meta: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`,
      });
    }
  }, [post]);

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

  if (!post) return <p>Post not found!</p>;

  return (
    <div className={styles.container}>
      {/* <div className={styles.sideContainer}> */}
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
              <Link href={url} key={index}>
                <li
                  className={styles.tocItem}
                  onClick={() => scrollToSection(index)}
                >
                  {item}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      {/* </div> */}

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
                      {shareUrls.meta && (
                        <a
                          href={shareUrls.meta}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaMeta
                            className={`${styles.articleIcon} ${styles.meta}`}
                          />
                        </a>
                      )}
                      {shareUrls.whatsapp && (
                        <a
                          href={shareUrls.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLogoWhatsapp
                            className={`${styles.articleIcon} ${styles.whatsapp}`}
                          />
                        </a>
                      )}
                      {shareUrls.twitter && (
                        <a
                          href={shareUrls.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter
                            className={`${styles.articleIcon} ${styles.twitter}`}
                          />
                        </a>
                      )}
                      {shareUrls.linkedin && (
                        <a
                          href={shareUrls.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedinIn
                            className={`${styles.articleIcon} ${styles.linkedin}`}
                          />
                        </a>
                      )}
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
                    {shareUrls.meta && (
                      <a
                        href={shareUrls.meta}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaMeta
                          className={`${styles.articleIcon} ${styles.meta}`}
                        />
                      </a>
                    )}
                    {shareUrls.whatsapp && (
                      <a
                        href={shareUrls.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoLogoWhatsapp
                          className={`${styles.articleIcon} ${styles.whatsapp}`}
                        />
                      </a>
                    )}
                    {shareUrls.twitter && (
                      <a
                        href={shareUrls.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaXTwitter
                          className={`${styles.articleIcon} ${styles.twitter}`}
                        />
                      </a>
                    )}
                    {shareUrls.linkedin && (
                      <a
                        href={shareUrls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedinIn
                          className={`${styles.articleIcon} ${styles.linkedin}`}
                        />
                      </a>
                    )}
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
