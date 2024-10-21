"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Slideshow({ className }) {
  const images = [
    "/images/slideshow1.webp",
    "/images/miche3.webp",
    "/images/slideshow2.webp",

    "/images/slideshow3.webp",
    "/images/parillada.webp",
    "/images/chorros.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`w-full h-[80vh] overflow-hidden ${className}`}>
      <div
        className="w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={src}
              alt="Slideshow images of Mexican food. Includes chicken, shrimp, bell pepper, tacos, ceviche, and much more. Beautiful pictures of a molcajete, mariscada, crab, ceviche, and more."
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
