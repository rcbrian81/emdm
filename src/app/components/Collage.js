"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Collage() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    // Update the screen size state on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set the initial state
    handleResize();

    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-0 h-[100vh] w-full">
      <div
        className="relative row-span-2 col-span-2 overflow-hidden cursor-pointer"
        onClick={() => openImage("/images/parillada1.webp")}
      >
        <Image
          src="/images/parillada1.webp"
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
          alt="Steaming Hot Fajitas with large shrimp served on cast-iron which is also seated on a thick wooden tray."
        />
      </div>

      {!isMobile && (
        <>
          <div
            className="relative col-span-1 overflow-hidden cursor-pointer"
            onClick={() => openImage("/images/margarona1.webp")}
          >
            <Image
              src="/images/margarona1.webp"
              layout="fill"
              objectFit="cover"
              className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
              alt="Margarita similar style drink called a Margarona. A glass chalice with an upside-down corona sitting in the yellow and ice-cold drink."
            />
          </div>
        </>
      )}
      <div
        className="relative col-span-3 md:col-span-1 overflow-hidden cursor-pointer"
        onClick={() => openImage("/images/molcajete1.webp")}
      >
        <Image
          src="/images/molcajete1.webp"
          alt="Stone and rock bowl filled with a sizzling sauce that from which emerges grilled chicken, carne asada, nopal, hot peppers, bacon-wrapped shrimp, and avocado."
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
        />
      </div>
      <div
        className="relative col-span-3 md:col-span-1 overflow-hidden cursor-pointer"
        onClick={() => openImage("/images/miche1.webp")}
      >
        <Image
          src="/images/miche1.webp"
          alt="Perfectly colored and ICE-cold michelada, brimmed with chili powder."
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
        />
      </div>
      {!isMobile && (
        <>
          <div
            className="relative col-span-1 overflow-hidden cursor-pointer"
            onClick={() => openImage("/images/cocktel1.webp")}
          >
            <Image
              src="/images/cocktel1.webp"
              alt="Glass cocktail cup packed and overflowing with shrimp, cucumber, onions, tomato, and scallops. It sits on a plate with lime and an oyster."
              layout="fill"
              objectFit="cover"
              className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
            />
          </div>
          <div
            className="relative col-span-1 overflow-hidden cursor-pointer"
            onClick={() => openImage("/images/cubeta1.webp")}
          >
            <Image
              src="/images/cubeta1.webp"
              alt="Silver beer bucket overflowing with ice and seating beers including corona, modelo, dos equis, victoria, and other Mexican beers."
              layout="fill"
              objectFit="cover"
              className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
            />
          </div>
          <div
            className="relative col-span-1 overflow-hidden cursor-pointer"
            onClick={() => openImage("/images/gobernador.webp")}
          >
            <Image
              src="/images/gobernador.webp"
              alt="2 shrimp-filled tacos held up by a silver stand and sitting on a plate alongside beans and rice."
              layout="fill"
              objectFit="cover"
              className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
            />
          </div>
        </>
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={selectedImage}
              alt="Expanded Image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
