import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

const Header = ({ tags }) => {
  const router = useRouter();
  const { tag } = router.query;

  const excludedTags = [
    "Business Analytics",
    "Interview Question",
    "Career",
    "Other",
  ];

  const filteredTags = tags?.filter((t) => !excludedTags.includes(t));
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (tag) {
      setSelectedTag(tag);
    }
  }, [tag]);

  const handleTagChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTag(selectedValue);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, tag: selectedValue },
    });
  };

  const handleNavItemClick = (item) => {
    setSelectedTag(item);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tag: item },
    });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.dropdown}>
          <select
            className={styles.dropdownSelect}
            value={selectedTag}
            onChange={handleTagChange}
          >
            {filteredTags?.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <ul className={styles.navItems}>
          {excludedTags?.map((item, index) => (
            <li key={index}>
              <a href="#" onClick={() => handleNavItemClick(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
