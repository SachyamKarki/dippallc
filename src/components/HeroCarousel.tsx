"use client";

import React from 'react';
import Image from 'next/image';

export default function HeroCarousel() {
  return (
    <div className="hero-person-container" aria-hidden="true">
      <Image
        src="/images/hero-person-v2.png"
        alt="Tech professional providing solutions"
        fill
        priority
        className="hero-person-image"
        sizes="50vw"
      />
    </div>
  );
}
