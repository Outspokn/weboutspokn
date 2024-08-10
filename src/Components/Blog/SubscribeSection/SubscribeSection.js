import styles from "./SubscribeSection.module.css";
import { MdEmail } from "react-icons/md";

const SubscribeSection = () => {
  return (
    <div className={styles.subscribeSection}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <h1>Subscribe For New Content</h1>
          <p>
            By Becoming A Member Of Our Blog, You Have Access Articles And
            Content
          </p>
        </div>
        <div className={styles.rightContent}>
          <h4>Email</h4>
          <div className={styles.subscription}>
            <div className={styles.inputWrapper}>
              <MdEmail className={styles.icon} />
              <input type="email" placeholder="Enter your email" />
            </div>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
