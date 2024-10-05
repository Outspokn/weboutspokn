import React from "react";
import styles from "../styles/contact.module.css";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h1>Contact Us</h1>
          <p>
            Email, call, or complete the form to learn how Snappy can solve your
            messaging problem.
          </p>
          <p>
            <strong>info@snappyapp.io</strong>
          </p>
          <p>321-231-231</p>
          <a href="#">Customer Support</a>
          <div className={styles.supportLinks}>
            <div>
              <h3>Customer Support</h3>
              <p>
                Our support team is available around the clock to address any
                concerns or queries you may have.
              </p>
            </div>
            <div>
              <h3>Feedback and Suggestions</h3>
              <p>
                We value your feedback and are constantly working to improve
                Snappy. Your input is crucial in shaping the future of Snappy.
              </p>
            </div>
            <div>
              <h3>Media Inquiries</h3>
              <p>
                For media-related questions or press inquiries, please contact
                us at outspokn@gmail.com.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contactForm}>
          <h2>Get in Touch</h2>
          <p className={styles.contactFormHeading}>You can reach us anytime</p>
          <form>
            <div className={styles.nameFields}>
              <input type="text" placeholder="First name" required />
              <input type="text" placeholder="Last name" required />
            </div>
            <input type="email" placeholder="Your email" required />
            <input type="text" placeholder="Phone number" required />

            <div className={styles.textareaContainer}>
              <textarea placeholder="How can we help?" required></textarea>
              <span className={styles.charCounter}>0/100</span>{" "}
            </div>
            <button type="submit">Submit</button>
          </form>
          <p className={styles.buttonText}>
            By contacting us, you agree to our <a href="#">Terms of service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </p>
        </div>
        <div className={styles.locationSection}>
          <div className={styles.mapPlaceholder}></div>
          <div className={styles.locationInfo}>
            <h2>Our Location</h2>
            <h1>Connecting Near and Far</h1>
            <div className={styles.headquartersInfo}>
              <h3>Headquarters</h3>
              <p>
                Snappy Inc.
                <br />
                San Francisco, USA
                <br />
                123 Tech Boulevard, Suite 456
                <br />
                San Francisco, CA 12345
                <br />
                United States
              </p>
              <a href="#">Open Google Maps</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
