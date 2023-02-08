/* eslint-disable import/no-unresolved */
import "swiper/css";
import "swiper/less/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Lazy, SwiperOptions } from "swiper";
import { CSSProperties, ReactElement } from "react";

export type Slide = {
  id: string;
  component: ReactElement;
};

type CarouselProps = {
  slides: Slide[];
  // eslint-disable-next-line react/require-default-props
  options?: Partial<SwiperOptions & { style: CSSProperties }>;
};

const Carousel = ({ slides, options }: CarouselProps) => {
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
      {...options}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>{slide.component}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
