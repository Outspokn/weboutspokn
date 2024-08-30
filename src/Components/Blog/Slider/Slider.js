import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

const Slider = ({ posts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderPosts = posts.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderPosts?.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderPosts?.length]);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        style={{ "--swiper-theme-color": "#304051" }}
        className="mySwiper"
        breakpoints={{
          1281: { slidesPerView: 1, spaceBetween: 40 },
          801: { slidesPerView: 1, spaceBetween: 30 },
          641: { slidesPerView: 1, spaceBetween: 10 },
          481: { slidesPerView: 1, spaceBetween: 10 },
          200: { slidesPerView: 1, spaceBetween: 10 },
        }}
      >
        {sliderPosts?.map((post, i) => (
          <SwiperSlide key={i} className={styles.slider}>
            <div className={styles.imageWrapper}>
              <Image
                // src={post.headerImg}
                src="/assets/sliderBackground.jpg"
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
              <div className={styles.overlay}></div>
            </div>
            <div className={styles.slideProfile}>
              <div className={styles.imgWrapperProfile}>
                <Image
                  // src={post.avatar}
                  src="/assets/sliderAuthor.jpg"
                  width={35}
                  height={35}
                  alt={post.author}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className={styles.slideProfileContent}>
                <h4 className={styles.slideName}>{post.author}</h4>
              </div>
            </div>
            <div className={styles.textWrapper}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.description}>
                {truncateText(post.desc, 203)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
