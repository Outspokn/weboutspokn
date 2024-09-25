import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import styles from "./FaqSection.module.css";

const FaqSection = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqData || faqData.length === 0) {
    return <p>No FAQs available for this post.</p>;
  }

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h3>Uncertain? Let us provide you with the information you need</h3>
        <button className={styles.helpCenterButton}>Visit help center</button>
      </div>
      <p className={styles.description}>
        If you need assistance, feel free to check out our FAQs.
      </p>
      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
          <div className={styles.faqItem} key={index}>
            <div
              className={styles.faqQuestion}
              onClick={() => toggleDropdown(index)}
            >
              <span>{faq.question}</span>
              <div className={styles.iconContainer}>
                {openIndex === index ? <IoChevronUp /> : <IoChevronDown />}
              </div>
            </div>
            {openIndex === index && (
              <div
                className={styles.faqAnswer}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
