import { useEffect, useState, useMemo } from "react";
import styles from "./Header.module.css";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Header = ({ posts, onFilter }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  // const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        posts
          .map((post) => post.tag?.trim())
          .filter(
            (tag) =>
              tag &&
              ![
                "Other",
                "Career",
                "Interview Question",
                // "Business Analyst",
                // "Business Analytics",
              ].includes(tag)
          )
      ),
    ],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (post) =>
          post.tag.trim().toLowerCase() === activeCategory.trim().toLowerCase()
      );
    }

    // if (searchTerm) {
    //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
    //   filtered = filtered.filter((post) =>
    //     post.tag.toLowerCase().includes(lowerCaseSearchTerm)
    //   );
    // }
    return filtered;
  }, [activeCategory, posts]);
  // [searchTerm, activeCategory, posts]);

  useEffect(() => {
    onFilter(filteredPosts);
  }, [filteredPosts, onFilter]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // setSearchTerm("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Discover Nice Articles Here</h1>
          <div className={styles.socialIcons}>
            <Link
              href="https://www.facebook.com/profile.php?id=61561944704188"
              target="_blank"
              aria-label="Go to the Twitter Page of Outspokn"
              className={`${styles.icon} ${styles.meta}`}
            >
              <FaMeta className={styles.FIcon} />
            </Link>
            <Link
              href="https://www.instagram.com/outspokn.ai"
              target="_blank"
              aria-label="Go to the Twitter Page of Outspokn"
              className={`${styles.icon} ${styles.instagram}`}
            >
              <FaInstagram className={styles.FIcon} />
            </Link>
            <Link
              href="https://www.youtube.com/@Outspokn_app"
              target="_blank"
              aria-label="Go to the Youtube of Outspokn"
              className={`${styles.icon} ${styles.youtube}`}
            >
              <FaYoutube className={styles.FIcon} />
            </Link>
            <Link
              href= "https://x.com/Outspokn_app"
              target="_blank"
              aria-label="Go to the Twitter Page of Outspokn"
              className={`${styles.icon} ${styles.twitter}`}
            >
              <FaXTwitter className={styles.FIcon} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/outspokn/"
              target="_blank"
              aria-label="Go to the Twitter Page of Outspokn"
              className={`${styles.icon} ${styles.linkedin}`}
            >
              <FaLinkedinIn className={styles.FIcon} />
            </Link>
          </div>
        </div>
        <p className={styles.description}>
          All The Articles And Contents Of The Site Have Been{" "}
          <span className={styles.updated}>Updated Today</span> And You Can Find{" "}
          <br />
          Your <span className={styles.updated}>
            Articles And Contents
          </span>{" "}
          Quickly And Without Any Problems.
        </p>
        <div className={styles.searchContainer}>
          {/* <div className={styles.searchBar}>
            <ImSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search... "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
