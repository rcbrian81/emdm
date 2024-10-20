"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Slideshow({ className }) {
  const images = [
    "/images/slideshow1.webp",
    "/images/miche5.webp",
    "/images/slideshow2.webp",
    "/images/slideshow3.webp",
    "/images/parillada.webp",
    "/images/chorros.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`w-full h-[80vh] overflow-hidden ${className}`}>
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex]}
          alt="Slideshow images of mexican food. includes, chicken, shrip, bell pepper, tacos, ceviche and much more. beautiful pictures of a molcajete, mariscada, crap, ceviche and more."
          layout="fill"
          objectFit="cover"
          className={`transition-opacity duration-1000 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
