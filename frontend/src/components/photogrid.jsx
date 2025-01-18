import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Correct import for Swiper v11
import "swiper/css";
import "swiper/css/autoplay";

const PhotoGrid = () => {
  const images = [
    "https://cdn.usegalileo.ai/sdxl10/4f5a385c-9d4f-4291-82af-f3972ab7c296.png",
    "https://cdn.usegalileo.ai/sdxl10/5841e98d-50ac-4e78-b0a8-668cb46e082e.png",
    "https://cdn.usegalileo.ai/sdxl10/4aeb7be8-d04c-4b31-9ce8-7cb71fc0987d.png",
    "https://cdn.usegalileo.ai/sdxl10/f92ae234-9a86-4b73-a690-25d8ef178f62.png",
  ];

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Swiper
        spaceBetween={10} // Reduce the gap between images
        slidesPerView={3} // Show 3 images at once
        loop={true} // Enable infinite loop
        autoplay={{
          delay: 0, // No delay for continuous sliding
          disableOnInteraction: false, // Keep autoplay active even after interaction
        }}
        speed={3000} // Adjust the speed for the "train" effect
        modules={[Autoplay]} // Register the Autoplay module
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                width: "200px", // Increase the size of the images
                height: "200px", // Increase the size of the images
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoGrid;
