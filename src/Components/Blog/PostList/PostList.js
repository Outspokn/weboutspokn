import { useState } from "react";
import Card from "../Card/Card";
import styles from "./PostList.module.css";

const data = [
  {
    id: 1,
    title: "How Do Phones With Thermal Cameras Work?",
    description:
      "All the articles and content of today's site have been updated and you can freely add your new articles and content.",
    date: "2021/08/29",
    viewers: "10K Viewers",
    author: "Marvin McKinney",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 2,
    title: "What Is Virtual Reality And Why Is It So Important?",
    description:
      "Virtual Reality (VR) is considered as important technology, giving scope for a great leap for adverse fields.",
    date: "2022/09/23",
    viewers: "10K Viewers",
    author: "Brooklyn Simmo",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 3,
    title: "Fantasy Robots Were Made Of Low-Alloy Materials",
    description:
      "Low-alloy steels belong to the group of ferrous materials containing alloying elements in less than stainless steels.",
    date: "2021/07/29",
    viewers: "10K Viewers",
    author: "Ronald Richards",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 4,
    title: "How Do Phones With Thermal Cameras Work?",
    description:
      "All the articles and content of today's site have been updated and you can freely add your new articles and content.",
    date: "2021/08/29",
    viewers: "10K Viewers",
    author: "Marvin McKinney",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 5,
    title: "What Is Virtual Reality And Why Is It So Important?",
    description:
      "Virtual Reality (VR) is considered as important technology, giving scope for a great leap for adverse fields.",
    date: "2022/09/23",
    viewers: "10K Viewers",
    author: "Brooklyn Simmo",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 6,
    title: "Fantasy Robots Were Made Of Low-Alloy Materials",
    description:
      "Low-alloy steels belong to the group of ferrous materials containing alloying elements in less than stainless steels.",
    date: "2021/07/29",
    viewers: "10K Viewers",
    author: "Ronald Richards",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 7,
    title: "How Do Phones With Thermal Cameras Work?",
    description:
      "All the articles and content of today's site have been updated and you can freely add your new articles and content.",
    date: "2021/08/29",
    viewers: "10K Viewers",
    author: "Marvin McKinney",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 8,
    title: "What Is Virtual Reality And Why Is It So Important?",
    description:
      "Virtual Reality (VR) is considered as important technology, giving scope for a great leap for adverse fields.",
    date: "2022/09/23",
    viewers: "10K Viewers",
    author: "Brooklyn Simmo",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 9,
    title: "Fantasy Robots Were Made Of Low-Alloy Materials",
    description:
      "Low-alloy steels belong to the group of ferrous materials containing alloying elements in less than stainless steels.",
    date: "2021/07/29",
    viewers: "10K Viewers",
    author: "Ronald Richards",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
  {
    id: 10,
    title: "How Do Phones With Thermal Cameras Work?",
    description:
      "All the articles and content of today's site have been updated and you can freely add your new articles and content.",
    date: "2021/08/29",
    viewers: "10K Viewers",
    author: "Marvin McKinney",
    image: "/assets/blog2.jpg",
    authorImage: "/assets/author.jpg",
  },
];

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(data.slice(0, 6));
  const [showMiddlePages, setShowMiddlePages] = useState(false);
  const itemsPerPage = 6;

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const newItems = data.slice(startIndex, startIndex + itemsPerPage);

    if (newItems.length > 0) {
      setDisplayedItems(newItems);
    }

    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (showMiddlePages) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    } else {
      return [1, 2, 3, "...", 8, 9];
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>All Blog</h2>
      <div className={styles.cardWrapper}>
        <div className={styles.grid}>
          {displayedItems.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.navButton}
          >
            &lt;
          </button>
          {getPageNumbers().map((number, index) =>
            number === "..." ? (
              <button
                key={index}
                onClick={() => setShowMiddlePages(true)}
                className={styles.ellipsis}
              >
                {number}
              </button>
            ) : (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={number === currentPage ? styles.active : ""}
              >
                {number}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 9}
            className={styles.navButton}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;