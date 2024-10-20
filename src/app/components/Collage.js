"use client";

import { useState } from "react";
import Image from "next/image";

export default function Collage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-0 h-[100vh] w-full">
      <div
        className="relative row-span-2 col-span-2 overflow-hidden cursor-pointer"
        onClick={() => openModal("/images/parillada1.webp")}
      >
        <Image
          src="/images/parillada1.webp"
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
          alt="Steaming Hot Fajitas with large shrimp served on cast-iorn which is also seated on a thick wooden tray."
        />
      </div>

      <div
        className="relative col-span-1 overflow-hidden  cursor-pointer"
        onClick={() => openModal("/images/margarona1.webp")}
      >
        <Image
          src="/images/margarona1.webp"
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
          alt="Margarita similar style drink called a Margarona. A Galss chalise with an upsidedown cornon sitting in the yellow and ice cold drink."
        />
      </div>
      <div
        className="relative col-span-1 overflow-hidden cursor-pointer"
        onClick={() => openModal("/images/molcajete1.webp")}
      >
        <Image
          src="/images/molcajete1.webp"
          alt="Stone and rock bowl filled with a sizling sauce that from which emerges grilled chicken, carne asada, nopal, hot pepers, bacon wrapped shrimp and avocado."
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
        />
      </div>
      <div
        className="relative col-span-1 overflow-hidden cursor-pointer"
        onClick={() => openModal("/images/miche1.webp")}
      >
        <Image
          src="/images/miche1.webp"
          alt="Perfectley colored and ICE-cold michelada, brimed with a chili powder."
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
        />
      </div>
      <div
        className="relative col-span-1 overflow-hidden cursor-pointer"
        onClick={() => openModal("/images/cocktel1.webp")}
      >
        <Image
          src="/images/cocktel1.webp"
          alt="Glass cocktel cup filled packed and overflowing with shrimp, cucumber, cucumber, onions, tomato, and scallops. It sits on a plate with lime and an oyster."
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
        />
      </div>
      <div
        className="relative col-span-1 overflow-hidden cursor-pointer"
        onClick={() => openModal("/images/cubeta.webp")}
      >
        <Image
          src="/images/cubeta.webp"
          alt="Silver beer bucket overflowing with ice and seating beers including corona, modelo, dos x's, victoria, and other mexicna beers."
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
        />
      </div>
      <div
        className="relative col-span-1 overflow-hidden cursor-pointer"
        onClick={() => openModal("/images/gobernador.webp")}
      >
        <Image
          src="/images/gobernador.webp"
          alt="2 shirmp filled tacos help up ny a silver stand and sitting on a plat alongside beans and rice."
          layout="fill"
          objectFit="cover"
          className="transition-transform transition-filter duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
        />
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal} // Close modal on click
        >
          <div className="relative w-[100vw] h-[100vh]">
            <Image
              src={selectedImage}
              alt="Expanded Image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
