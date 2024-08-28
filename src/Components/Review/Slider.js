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
      id: 1,
      desc: '"As a non-native English speaker, mastering the language has always been a challenge for me. Outspokn has been a game changer! been a game changer! "',
      name: "Sarah J.",
      role: "College Student",
      src: "https://outspokn-fr.s3.us-east-2.amazonaws.com/Login/2.png",
    },
    {
      id: 2,
      desc: '"Outspokn is not just another language learning app—its a gift. The daily challenges keep me motivated, and putting myself. motivated, and putting myself"',
      name: "Luisa M.",
      role: "Travel Blogger",
      src: "https://outspokn-fr.s3.us-east-2.amazonaws.com/Login/3.png",
    },
    {
      id: 3,
      desc: '"As a non-native English speaker, mastering the language has always been a challenge for me. Outspokn has been a game changer! been a game changer!"',
      name: "David K.",
      role: "Marketing Manager",
      src: "https://outspokn-fr.s3.us-east-2.amazonaws.com/Login/profile-dum1.png",
    },
    {
      id: 4,
      desc: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus nisi amet non at phasellus faucibus senectus in”",
      name: "John carter",
      role: "Role, Company",
      src: "https://outspoknweb.s3.us-east-2.amazonaws.com/review/review-fake.png",
    },
    {
      id: 5,
      desc: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus nisi amet non at phasellus faucibus senectus in”",
      name: "John carter",
      role: "Role, Company",
      src: "https://outspoknweb.s3.us-east-2.amazonaws.com/review/review-fake.png",
    },
    {
      id: 6,
      desc: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus nisi amet non at phasellus faucibus senectus in”",
      name: "John carter",
      role: "Role, Company",
      src: "https://outspoknweb.s3.us-east-2.amazonaws.com/review/review-fake.png",
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
