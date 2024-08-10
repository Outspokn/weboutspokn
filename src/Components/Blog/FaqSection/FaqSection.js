import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import styles from "./FaqSection.module.css";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question:
        "Is Timiker.io right for my company, and if so, how do we begin using it?",
      answer:
        "Timiker.io offers powerful tools and resources that can seamlessly scale your business...",
    },
    {
      question:
        "How much would I have to pay to use the services offered by Timiker.io?",
      answer:
        "The cost of using Timiker.io varies depending on your business needs...",
    },
    {
      question:
        "Wondering if Timiker.io is right for you? Here's why you should give it a try.",
      answer:
        "Revolutionize the way you manage your team with Timiker.io. Our all-in-one PEO solution...",
    },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h3>Uncertain? Let us provide you with the information you need</h3>
        <button className={styles.helpCenterButton}>Visit help center</button>
      </div>
      <p>
        Our websites had a list of questions and answers that aim to provide
        clarity on a particular subject.
        <br />
        If you need assistance, feel free to check out our FAQs.
      </p>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
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
              <div className={styles.faqAnswer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
