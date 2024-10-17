import React, { useState } from "react";
import styles from "../styles/contact.module.css";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      newsletter_passkey: process.env.EXT_PUBLIC_API_KEY1,
    });

    if (name === "message") {
      setCharCount(value.length);
    }
  };
  console.log(process.env.NEXT_PUBLIC_API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}users/web_contact_us/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        // Handle error (e.g., show an error message)
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h1>Contact Us</h1>
          <p>
            If you are facing any problem with accessing the mobile app, please
            reach out to us at
          </p>
          <p>
            <strong>support@outspokn.co</strong>
          </p>
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
                us at support@outspokn.co
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contactForm}>
          <h2>Get in Touch</h2>
          <p className={styles.contactFormHeading}>You can reach us anytime</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.nameFields}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <div className={styles.textareaContainer}>
              <textarea
                name="message"
                placeholder="How can we help?"
                value={formData.message}
                onChange={handleChange}
                maxLength="100"
                required
              ></textarea>
              <span className={styles.charCounter}>{charCount}/100</span>{" "}
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.8533047427787!2d77.64115477499841!3d12.935036190876825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14530e4f7f71%3A0x9ac0147f0d4600fc!2sOutspokn%20Inc.!5e0!3m2!1sen!2sin!4v1696487485562!5m2!1sen!2sin"
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
                LinguaQuest Technology Private Limited
                <br />
                No 224, 3rd Flr, 80/3,
                <br />
                Oldmadras Road, Doorvaninagar,
                <br />
                Bangalore North Bengaluru
                <br />
                Karnataka 560016
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
