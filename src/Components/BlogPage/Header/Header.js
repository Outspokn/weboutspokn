import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  const navItems = [
    "Articles",
    "Tutorials",
    "Interview Questions",
    "Free Courses",
    "Videos",
    "Projects",
    "Career Guide",
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.dropdown}>
          <select className={styles.dropdownSelect}>
            <option value="ai-mi">AI and Machine Learning</option>{" "}
            <option value="full-stack">Full Stack Web Developer</option>
            <option value="data-science">Data Science</option>
            <option value="cyber-security">Cyber Security</option>
            <option value="cloud-computing">Cloud Computing</option>
            <option value="devops">DevOps</option>
            <option value="blockchain">Blockchain Development</option>
            <option value="ui-ux">UI/UX Design</option>
          </select>
        </div>
        <ul className={styles.navItems}>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
