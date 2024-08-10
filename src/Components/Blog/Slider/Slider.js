import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

const slides = [
  {
    id: 1,
    title: "Artificial Intelligence Beyond Imaginations",
    description:
      "Artificial Intelligence Has Been Advancing Beyond What Humans Have Imagined For Decades And Will Dominate Humans In The Coming Years, But The Question Is, Why Will It Happen Like...",
    author: "Saraj Kolhyseg",
    authorImage: "/assets/lady.jpg",
  },
  {
    id: 2,
    title: "The Future of AI",
    description:
      "Exploring the potential advancements in AI technology and how it will shape the world.",
    author: "Jane Doe",
    authorImage: "/assets/lady.jpg",
  },
  {
    id: 3,
    title: "AI in Everyday Life",
    description:
      "How artificial intelligence is becoming an integral part of our daily routines.",
    author: "John Smith",
    authorImage: "/assets/lady.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className={styles.slider}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/lightblue.jpg"
                alt="img-bck"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.slideProfile}>
              <div className={styles.imgWrapper}>
                <Image
                  src={slide.authorImage}
                  width={35}
                  height={35}
                  alt={slide.author}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className={styles.slideProfileContent}>
                <h4 className={styles.slideName}>{slide.author}</h4>
              </div>
            </div>
            <h3 className={styles.title}>{slide.title}</h3>
            <p className={styles.description}>{slide.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
