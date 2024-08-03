import React, { useState } from "react";
import styles from "./Header.module.css";
import { ImTwitter, ImYoutube, ImSearch } from "react-icons/im";
import Link from "next/link";

const Header = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    "Manufacturing",
    "Technology",
    "Sport",
    "Design",
    "Programming",
    "Engineering",
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Discover Nice Articles Here</h1>
          <div className={styles.socialIcons}>
            <Link
              href="https://twitter.com"
              className={`${styles.icon} ${styles.twitter}`}
            >
              <ImTwitter />
            </Link>
            <Link
              href="https://youtube.com"
              className={`${styles.icon} ${styles.youtube}`}
            >
              <ImYoutube />
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
          <div className={styles.searchBar}>
            <ImSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search..." />
          </div>
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(category)}
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
