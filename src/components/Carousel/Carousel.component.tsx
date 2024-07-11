import React, { useState } from 'react';
import styles from './Carousel.module.scss';
import Image from 'next/image';

interface CarouselProps {
  items: string[];
  showArrows?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ items, showArrows = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    // increase the index, if we are at the end of the array, set it to the first item
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className={styles.carousel}>
      {showArrows && items.length > 1 && (
        <button onClick={prevSlide} className={styles.arrow}>
          &#10094;
        </button>
      )}
      <div className={styles.carouselContent}>
        {/* left side of the carousel */}
        {
          // we only want to show this if there is an item previous the current one, if not set it to the last item
          // if there is only one item, dont render this

          items[(currentIndex - 1 + items.length) % items.length] &&
            items.length > 1 && (
              <div
                className={`${styles.carouselItem} ${styles.side}`}
                onClick={() => {
                  // set index to this item
                  setCurrentIndex(
                    (currentIndex - 1 + items.length) % items.length
                  );
                }}
              >
                {/* we want to target the item previous to the one we are currently on */}
                <img
                  src={items[(currentIndex - 1 + items.length) % items.length]}
                  alt="previous"
                />
              </div>
            )
        }

        {/* current item */}
        <div className={`${styles.carouselItem} ${styles.active}`}>
          <img src={items[currentIndex]} alt="current"/>
        </div>

        {/* Right side of the carousel */}
        {
          // we only want to show this if there is an item after the current one, if not set it to the first item
          // if there is only one item, dont render this

          items[(currentIndex + 1) % items.length] && items.length > 1 && (
            <div
              className={`${styles.carouselItem} ${styles.side}`}
              onClick={() => {
                // set index to this item
                setCurrentIndex((currentIndex + 1) % items.length);
              }}
            >
              {/* we want to target the item next to the one we are currently on */}
              <img src={items[(currentIndex + 1) % items.length]} alt="next" />
            </div>
          )
        }
      </div>
      {showArrows && items.length > 1 && (
        <button onClick={nextSlide} className={styles.arrow}>
          &#10095;
        </button>
      )}
    </div>
  );
};

export default Carousel;
