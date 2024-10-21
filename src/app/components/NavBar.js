"use client";
import { useState } from "react";
import Image from "next/image";

export default function NavBar({ colors, className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`${colors} flex flex-col w-screen justify-center items-center shadow-2xl z-50 ${className} ${
        isOpen ? "h-auto" : "h-[12vh]"
      } md:h-[20vh]`}
    >
      <div className="flex justify-between items-center w-full pl-2 md:px-4 h-full md:w-1/2 md:justify-center">
        <div>
          {/* Ensure a higher resolution logo is available */}
          <a href="/">
            <Image
              src="/images/nav_logo.webp"
              alt="Logo"
              layout="intrinsic"
              width={200} // Smaller logo width for mobile
              height={21} // Smaller logo height for mobile
              sizes="(max-width: 768px) 300px, 500px" // Serve smaller image on mobile, larger image on bigger screens
              objectFit="contain"
              className="md:w-[500px] md:h-[106px]" // Larger logo for larger screens
            />
          </a>
        </div>
        <div className="self-end mr-1 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-13 h-12" // Larger hamburger icon for small screens
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full md:flex md:justify-center md:items-center text-2xl m-4`}
      >
        <ul
          className={`flex flex-col items-center space-y-4 text-3xl md:text-3xl md:flex-row md:space-y-0 md:space-x-8 ${
            isOpen ? "mt-4 text-3xl" : ""
          }`}
        >
          <li>
            <a href="/" className="hover:text-yellow-100">
              Home
            </a>
          </li>
          <li>
            <a href="/menu" className="hover:text-yellow-100">
              Menu
            </a>
          </li>
          <li>
            <a
              target="blank"
              href="https://maps.app.goo.gl/4bt9FmL5GN797eSX9"
              className="hover:text-yellow-100"
            >
              Directions
            </a>
          </li>
          <li className="relative group">
            <a className="hover:text-yellow-100 cursor-pointer">Highlights</a>
            {/* Dropdown */}
            <ul className="absolute hidden group-hover:block bg-white text-black border border-gray-300 space-y-2 shadow-lg z-50">
              <li>
                <a
                  href="/micheladas"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Micheladas
                </a>
              </li>
              <li>
                <a href="/tacos" className="block px-4 py-2 hover:bg-gray-100">
                  Tacos
                </a>
              </li>
              <li>
                <a
                  href="/burritos"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Burritos
                </a>
              </li>
            </ul>
          </li>
          <li className="flex space-x-4">
            <a
              target="blank"
              href="https://www.facebook.com/mundodemariscos/"
              className="hover:text-yellow-100"
            >
              <Image
                src="/images/fb_icon.webp"
                alt="Facebook Icon"
                layout="intrinsic"
                width={32}
                height={32}
                objectFit="contain"
              />
            </a>
            <a
              target="blank"
              href="https://www.instagram.com/el_mundo_de_mariscos?igsh=MWU4bjJ5eW1sN2plaQ%3D%3D&utm_source=qr"
              className="hover:text-yellow-100"
            >
              <Image
                src="/images/insta_icon.webp"
                alt="Instagram Icon"
                layout="intrinsic"
                width={32}
                height={32}
                objectFit="contain"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
