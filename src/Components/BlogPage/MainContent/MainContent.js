import React, { useRef, useEffect, useState } from "react";
import styles from "./MainContent.module.css";
import { IoLogoWhatsapp } from "react-icons/io5";
import Image from "next/image";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const MainContent = ({ post }) => {
  const articleRef = useRef(null);
  const [shareUrls, setShareUrls] = useState({});
  const tocRef = useRef(null);
  const [isTocVisible, setIsTocVisible] = useState(true);
  console.log(post.img, "post");

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

  const handleAnchorClick = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + articleRef.current.scrollTop - offset;

      articleRef.current.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const tocHeight = tocRef.current?.offsetHeight || 0;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > tocHeight) {
      setIsTocVisible(false);
    } else {
      setIsTocVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!post) return <p>Post not found!</p>;

  return (
    <div className={styles.container}>
      <div
        ref={tocRef}
        className={`${styles.sidebar} ${isTocVisible ? "" : styles.hidden}`}
      >
        <h3>Table of Contents</h3>
        <ul className={styles.tocList}>
          {post?.table?.map((item, index) => {
            if (typeof item !== "string") {
              return null;
            }

            const removeSpecial = item?.replace(
              /[&\/\\#,+()$~%.'":*?<>{}]/g,
              ""
            );
            const uMake = removeSpecial?.toLowerCase()?.replace(/\s+/g, "-");
            const url = `#${uMake}`;

            return (
              <li key={index} className={styles.tocItem}>
                <Link
                  href={url}
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick(uMake);
                  }}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.main} ref={articleRef}>
        <article className={styles.article}>
          <div className={styles.imgWrapper}>
            <Image
              src={post.img || "/assets/blog3.png"}
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
                      <span className={styles.shareText}>Share:</span>
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
                    <span className={styles.shareText}>Share:</span>

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
