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
            <strong>info@outspokn.io</strong>
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
                Outspokn. Your input is crucial in shaping the future of
                Outspokn.
              </p>
            </div>
            <div>
              <h3>Media Inquiries</h3>
              <p>
                For media-related questions or press inquiries, please contact
                us at outspokn@gmail.com
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
          <div className={styles.mapPlaceholder}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.8533047427787!2d77.64115477499841!3d12.935036190876825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14530e4f7f71%3A0x9ac0147f0d4600fc!2sLearnBay%20-%20Data%20Science%20and%20AI%20Course%20Training%20Institute!5e0!3m2!1sen!2sin!4v1696487485562!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className={styles.locationInfo}>
            <h3>Our Location</h3>
            <h2>Connecting Near and Far</h2>
            <div className={styles.headquartersInfo}>
              <h4>Headquarters</h4>
              <p>
                Outspokn Inc.
                <br />
                San Francisco, USA
                <br />
                123 Tech Boulevard, Suite 456
                <br />
                San Francisco, CA 12345
                <br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
