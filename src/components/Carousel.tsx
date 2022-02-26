/* eslint-disable import/no-unresolved */
import "swiper/css";
import "swiper/less/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "@chakra-ui/react";
import { Navigation, Pagination, Autoplay, Lazy } from "swiper";

type CarouselProps = {
  slides: string[];
};

const Carousel = ({ slides }: CarouselProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Lazy, Autoplay]}
      // navigation options
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      // pagination options
      pagination={{
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      }}
      // lazy module options
      preloadImages={false}
      lazy
      // autoplay module options
      speed={800}
      autoplay={{
        delay: 5000,
      }}
      loop
      // other options
      spaceBetween={0}
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(currentSwiper) => console.log(currentSwiper)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide}>
          <Image
            width="100%"
            height="70vh"
            objectFit="cover"
            src={slide}
            alt={`Slide-${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
