"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    url: '/images/hero/clean.png',
    alt: 'Minimalist software prism'
  }
];

export default function HeroCarousel() {
  // Keeping the carousel structure in case we add more clean images later, 
  // but for now, we use a single ultra-clean image as requested.
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-carousel-container" aria-hidden="true">
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`hero-carousel-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ zIndex: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={index === 0}
            className="hero-carousel-image"
            sizes="100vw"
            quality={100}
          />
          <div className="hero-carousel-overlay" />
        </div>
      ))}
    </div>
  );
}
