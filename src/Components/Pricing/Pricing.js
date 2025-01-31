import styles from './Pricing.module.css';
import { CheckCircle, Zap } from 'react-feather';

const Pricing = () => {
  const handleGetStartedClick = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.outspokn';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Master Business communication with Outspokn</h1>
        <p>Learn Business communication with our AI language expert in 30 days.</p>
      </header>

      <div className={styles.pricingCard}>
        <div className={styles.priceSection}>
          <div className={styles.priceHeader}>
            <h2>Our Plan</h2>
            <div className={styles.price}>
              <span>Rs. 2000</span>
            </div>
            <button className={styles.ctaButton} onClick={handleGetStartedClick}>
              <Zap size={18} />
              Get Started Now
            </button>
          </div>

          <div className={styles.valuePoints}></div>
        </div>

        <div className={styles.featuresSection}>
          <h3>Features:</h3>
          <ul className={styles.featuresList}>
            {[
              "Classes : 90",
              "Human-led classes : 9",
              "20 mins Quick Classes",
              "Lifetime Validity",
            ].map((feature, index) => (
              <li key={index}>
                <CheckCircle size={18} />
                {feature}
              </li>
            ))}
          </ul>
          <div className={styles.valueItem}>
            <CheckCircle size={18} />
            <p>Generate detailed professional resume/ cover letter for up to 3 roles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
