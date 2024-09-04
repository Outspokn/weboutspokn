import { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./PostList.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PostList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllPages, setShowAllPages] = useState(false);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const displayedItems = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (showAllPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage < 3) {
          pageNumbers.push(1, 2, 3, "...", totalPages);
        } else if (currentPage > totalPages - 2) {
          pageNumbers.push(
            1,
            "...",
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pageNumbers.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
          );
        }
      }
    }
    return pageNumbers;
  };

  if (posts.length <= 1) return null;

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>All Blog Posts</h2>
      </div>

      <div className={styles.cardWrapper}>
        <div className={styles.grid}>
          {displayedItems.map((item) => (
            <Card key={item.id} post={item} />
          ))}
        </div>

        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.navButton}
          >
            <MdKeyboardArrowLeft className={styles.navIcon} />
          </button>

          {getPageNumbers().map((number, index) =>
            number === "..." ? (
              <button
                key={`ellipsis-${index}`}
                onClick={() => setShowAllPages(true)}
                className={styles.ellipsis}
              >
                {number}
              </button>
            ) : (
              <button
                key={`page-${number}`}
                onClick={() => handlePageChange(number)}
                className={number === currentPage ? styles.active : ""}
              >
                {number}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.navButton}
          >
            <MdKeyboardArrowRight className={styles.navIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
