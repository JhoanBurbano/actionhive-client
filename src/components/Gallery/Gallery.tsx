import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import './Gallery.styles.scss'

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import { Swiper as SwiperCore } from "swiper/core";

interface GalleryProps {
  images: Array<string>;
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <div className="gallery-custom">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-custom__view"
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index} className="gallery-custom__view-container" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <img src={image} alt={"slide" + index} className="gallery-custom__view-container-image"/>
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-custom__thumbs"
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index} className="gallery-custom__thumbs-container">
              <img src={image} alt={"slide" + index} className="gallery-custom__thumbs-container-image"/>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
