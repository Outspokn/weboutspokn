import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { ImTwitter, ImYoutube, ImSearch } from "react-icons/im";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Understanding React",
    summary: "A deep dive into React and its core concepts.",
    category: "Technology",
  },
  {
    id: 2,
    title: "Best Manufacturing Practices",
    summary: "Exploring best practices in manufacturing.",
    category: "Manufacturing",
  },
  {
    id: 3,
    title: "The Future of Sports",
    summary: "How technology is shaping the future of sports.",
    category: "Sport",
  },
];

const Header = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const categories = [
    "All",
    "Manufacturing",
    "Technology",
    "Sport",
    "Design",
    "Programming",
    "Engineering",
  ];

  useEffect(() => {
    filterArticles();
  }, [searchTerm, activeCategory]);

  const filterArticles = () => {
    let filtered = articles;

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === activeCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredArticles(filtered);
  };

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
            <input
              type="text"
              placeholder="Search... "
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
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
