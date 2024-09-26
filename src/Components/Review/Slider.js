import React, { useState, useEffect } from "react";
import styles from "./Review.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

const Slider = () => {
  const reviewArray = [
        {
      id: 4,
      desc: "“I used to dread interviews due to my shaky English, but Outspokn has completely turned that around. Now, I walk into interviews with confidence, able to express myself and impress potential employers.”",
      name: "HARINI",
      role: "Engineering Student",
      src: "https://outspoknweb.s3.us-east-2.amazonaws.com/review/harini.webp",
    },
    {
      id: 5,
      desc: "“Outspokn has truly revolutionized how I approach English language learning. Its interactive sessions make learning so engaging and fun. I can't believe how much my speaking skills have improved!”",
      name: "ANIL",
      role: "Student",
      src: "https://outspoknweb.s3.us-east-2.amazonaws.com/review/anil.webp",
    },
    {
      id: 6,
      desc: "“I've tried many language apps, but Outspokn stands out with its personalized approach. It tailors the lessons to my pace and skills, making it incredibly effective for my learning style.”",
      name: "RADHIKA",
      role: "Software Developer",
      src: "https://outspoknweb.s3.us-east-2.amazonaws.com/review/radhika.webp",
    },
  ];
  return (
    <Swiper
      slidesPerView={2.5}
      spaceBetween={30}
      pagination={true}
      modules={[Pagination]}
      style={{ "--swiper-theme-color": "#304051" }}
      className="mySwiper"
      breakpoints={{
        1281: { slidesPerView: 3, spaceBetween: 40 },
        801: { slidesPerView: 2.5, spaceBetween: 30 },
        641: { slidesPerView: 1.6, spaceBetween: 10 },
        481: { slidesPerView: 1, spaceBetween: 10 },
        200: { slidesPerView: 1, spaceBetween: 10 },
      }}
    >
      {reviewArray.map((data, i) => {
        return (
          <SwiperSlide key={i} loop={true} className={styles.sliderCard}>
            <p className={styles.desc}>{data.desc}</p>
            <div className={styles.reviewProfile}>
              <div className={styles.imgWrapper}>
                <Image
                  src={data.src}
                  width={50}
                  height={50}
                  alt={data.name}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className={styles.reviewProfileContent}>
                <h4 className={styles.reviewName}>{data.name}</h4>
                <p className={styles.reviewRole}>{data.role}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
