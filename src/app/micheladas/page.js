import Image from "next/image";

import NavBar from "../components/NavBar";
import OutCrop from "../components/OutCrop";
import Footer from "../components/Footer";

export const metadata = {
  title: "El Mundo De Mariscos Best Micheladas in Oceanside ",
  description:
    "Discover the best micheladas in Oceanside, CA, at El Mundo de Mariscos. Our micheladas are crafted with ice-cold beer, fresh lime juice, and our signature homemade chili powder that customers love. Whether you're enjoying a game day or just craving a refreshing drink, our micheladas offer the perfect balance of flavor and spice, all served in a lively Mexican atmosphere with great music and unbeatable vibes.",
  keywords:
    "micheladas, Oceanside, best micheladas, Mexican drinks, mariscos, El Mundo de Mariscos",
  author: "El Mundo de Mariscos",
  canonical: "https://yourwebsite.com/micheladas",
  openGraph: {
    title: "El Mundo De Mariscos - Best Micheladas in Oceanside",
    description:
      "Discover the best micheladas in Oceanside, CA, at El Mundo de Mariscos.",
    image: "https://mundodemariscos.com/images/micheladas.webp",
    url: "https://mundodemariscos.com/micheladas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Mundo De Mariscos - Best Micheladas in Oceanside",
    description:
      "Discover the best micheladas in Oceanside, CA, at El Mundo de Mariscos.",
    image: "https://mundodemariscos.com/images/micheladas.webp",
  },
};
export default function Tacos() {
  return (
    <div className="text-black bg-white ">
      <NavBar
        colors="bg-black bg-opacity-70 text-white"
        className={" text-black fixed"}
      />
      <div className="relative w-full pt-9vh md:pt-[20vh]  pt-0  md:h-[90vh] h-[100vh]">
        {/* Background image */}
        <img
          src="/images/miche3.webp"
          alt="2 sweating delicous michelada drinks. Along side the micheladas are a side of chips and salsa and and 7 bottled beers in the back"
          className="object-cover w-full h-full"
          loading="eager"
        />
      </div>

      <h1 className="bg-black text-white text-3xl md:text-5xl font-bold h-[10vh] flex items-center justify-center">
        Best Micheladas in Oceanside CA
      </h1>

      <OutCrop
        colors="bg-blue-400 text-black"
        title="OUR MICHELADS"
        imageSrc="miche6.webp"
        text="One of the highlights at El Mundo de Mariscos is our cold, refreshing, and absolutely delicious micheladas. Crafted to perfection, our micheladas offer a wide variety of beer choices, paired with our signature homemade chili powder that customers fall in love with. This specialty drink, combined with our great music and lively atmosphere, makes it the perfect way to enjoy a refreshing break. Our micheladas are more than just a drink—they’re an experience, and a must-try when you visit Oceanside!"
        alt="Red Chili covered Michelada. The brim is chili covered with a blurry background of another michelada and beers."
      />
      <OutCrop
        colors="bg-black text-white"
        title="ABOUT MICHELADAS"
        imageSrc="miche7.webp"
        imagePosition="right"
        className="h-1/2"
        text="A michelada is a refreshing Mexican cocktail that combines beer, Clamato juice, fresh lime, spices, and seasonings, creating a perfectly balanced drink with a savory kick. Clamato, a unique blend of tomato juice and clam broth, gives the michelada its signature flavor—light, tangy, and slightly salty. It's the ultimate choice for anyone who enjoys bold, savory drinks with a hint of zest.

The experience of drinking a michelada is like no other. Whether you’re relaxing with friends, enjoying a meal, or cooling down on a warm day, the combination of beer and Clamato, topped with spices, is refreshing and satisfying. It’s not just a drink; it’s a flavorful journey.

At El Mundo de Mariscos, we elevate this classic with our homemade michelada, crafted with care and served with our signature chili powder rim. If you’re in Oceanside, CA, you won’t want to miss the chance to try this one-of-a-kind specialty!"
        alt="The tops of 2 ice cold micheladas. the cup is overflowing and seating because of how cold  it is with ice poping out of the top. 3 beers in the background."
      />

      <Footer />
    </div>
  );
}
