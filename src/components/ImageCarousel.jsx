import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      className="image-carousel"
    >
      <div>
        <img src="/src/assets/CONCRETE IMG 1.JPEG" alt="Concrete Image 1" />
      </div>
      <div>
        <img src="/src/assets/CONCRETE IMG 2.JPEG" alt="Concrete Image 2" />
      </div>
      <div>
        <img src="/src/assets/CONCRETE IMG 3.JPEG" alt="Concrete Image 3" />
      </div>
    </Carousel>
  );
};
export default ImageCarousel;
