import { useState } from "react";
import "./CarCarousel.css";

const CarCarousel = ({ images = [] }) => {
  const [index, setIndex] = useState(0);
  const hasImages = images.length > 0;
  const go = (dir) => {
    if (!hasImages) return;
    setIndex((prev) => (prev + dir + images.length) % images.length);
  };

  const current = hasImages ? images[index].image_url : "https://via.placeholder.com/800x450?text=Sin+imagen";

  return (
    <div className="carousel">
      <img src={current} alt="car" />
      {hasImages && (
        <>
          <button className="carousel-btn left" onClick={() => go(-1)}>
            ‹
          </button>
          <button className="carousel-btn right" onClick={() => go(1)}>
            ›
          </button>
          <div className="carousel-indicator">
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default CarCarousel;
