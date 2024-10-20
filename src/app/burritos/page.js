import Image from "next/image";

import NavBar from "../components/NavBar";
import OutCrop from "../components/OutCrop";
import Footer from "../components/Footer";

export const metadata = {
  title: "El Mundo De Mariscos Best Tacos in Oceanside ",
  description:
    "Our burritos at El Mundo de Mariscos are packed with bold flavors and hearty fillings, offering the perfect meal for any appetite. Choose from carne asada, mariscos, or grilled chicken burritos, all wrapped to perfection. Pair your burrito with an ice-cold michelada or a Mexican Coke, and experience the perfect combination of flavors. Whether you're here for a casual meal or enjoying game days with friends, our burritos, drinks, and lively Mexican atmosphere will make your visit unforgettable.",
  keywords:
    "Burritos, Oceanside, best Burritos, Mexican Food, Mexican drinks, mariscos, El Mundo de Mariscos",
  author: "El Mundo de Mariscos",
  canonical: "https://mundodemariscos.com/burritos",
  openGraph: {
    title: "El Mundo De Mariscos - Best Burritos in Oceanside",
    description:
      "Discover the best Burritos in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
    url: "https://mundodemariscos.com/burritos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Mundo De Mariscos - Best Burritos in Oceanside",
    description:
      "Discover the best Burritos in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
  },
};

export default function Burrito() {
  return (
    <div className="text-black bg-white ">
      <NavBar
        colors="bg-white text-black"
        className={" text-black fixed border-b-4 border-black"}
      />
      <div className="relative w-full h-screen">
        {/* Background image */}
        <img
          src="/images/bburito4.webp"
          alt="Your Image Description"
          className="object-cover w-full h-full"
        />

        <h1 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl font-bold p-4">
          Oceanside, CA 's Best Burritos
        </h1>
      </div>

      <ul className="flex flex-row w-screen h-[15vh] bg-black text-white text-4xl gap-10 justify-center items-center">
        <li className="hover:text-yellow-300">Cali</li>
        <li className="hover:text-yellow-300">Breakfeast</li>
        <li className="hover:text-yellow-300">Carne Asada</li>
        <li className="hover:text-yellow-300">Camaron</li>
        <li className="hover:text-yellow-300">Adobada</li>
        <li className="hover:text-yellow-300">Pescado</li>
        <li className="hover:text-yellow-300">Pollo</li>
        <li className="hover:text-yellow-300">Surf&Turf</li>
      </ul>

      <OutCrop
        title="Breakfeast Burrito"
        text="Kickstart your morning with our Breakfast Burrito, loaded with fluffy eggs, golden potatoes, melted cheese, and your choice of bacon or sausage. This hearty burrito is perfect for game day mornings or a leisurely weekend brunch. Pair it with a refreshing Mexican Coke or a morning michelada for the perfect start to your day.
"
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10"
        colors="bg-white text-black"
        imageSrc="bburrito1.webp"
        alt="Delicous Breakfeast Burrito. A Staple of the Mexican Food scene in southern California!"
      />
      <OutCrop
        title="Camaron Burrito"
        text="The Camarón Burrito is our biggest and boldest, loaded with succulent shrimp, bell peppers, onions, tomatoes, cheese, avocado, and rice. This massive burrito is perfect for a big appetite, especially on game day or a weekend feast. Pair it with an ice-cold beer or our famous micheladas for the ultimate experience.
"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-red-400 text-black"
      />
      <OutCrop
        title="Carane Asada Burrito"
        text="Satisfy your cravings with our generously sized Carne Asada Burrito, filled with tender grilled carne asada, fresh guacamole, and salsa fresca. Perfect for enjoying on game day or any day, this burrito is bursting with authentic Mexican flavors. Don't forget to pair it with one of our famous micheladas or an ice-cold beer to complete the experience.
"
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10 mb-10"
        colors="bg-blue-400 text-black"
      />
      <OutCrop
        title="Burrito de Pollo"
        text="Our Chicken Burrito is packed with juicy grilled chicken, sautéed bell peppers, onions, and melted cheese. Whether you're enjoying game day or looking for a filling lunch, this burrito is sure to satisfy. Add a cold Mexican Coke or one of our micheladas for the perfect pairing.
"
        imageSrc="bpollo.webp"
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10"
        colors="bg-white text-black"
        alt="Wouth watering chicken burrito cut in half exposing all its rich colors and juiciness"
      />
      <OutCrop
        title="California Burrito"
        text="Our California Burrito is a local favorite, filled with tender carne asada, crispy fries, melted cheese, and sour cream, all wrapped in a warm tortilla. Whether you're enjoying it during a weekend or game day, pair it with a Mexican Coke or an ice-cold beer to complete the experience."
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-red-400 text-black"
        imageSrc=""
      />
      <OutCrop
        title="Adobada Burrito"
        text="Our Adobada Burrito is packed with marinated adobada, fresh guacamole, and pico de gallo for a mouthwatering combination of flavors. Enjoy this deliciously spiced burrito during game day or a weekend out, and pair it with a refreshing Mexican soda or cold michelada for the perfect meal.
"
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10 mb-10"
        colors="bg-blue-400 text-black"
      />
      <OutCrop
        title="Pescado Burrito"
        text="Try our fresh and flavorful Pescado Burrito, featuring grilled fish, homemade cream, crunchy cabbage, and salsa fresca. This light yet satisfying burrito is perfect for a weekend lunch or game day. Pair it with a refreshing michelada or a cold Mexican soda for a true taste of the coast.
"
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10"
        colors="bg-white text-black"
        imageSrc=""
      />
      <OutCrop
        title="Carnitas Burrito"
        text="Dig into our Carnitas Burrito, filled with tender carnitas, guacamole, and salsa fresca. This classic burrito is perfect for game days, weekends, or any time you're craving bold flavors. Pair it with an ice-cold Mexican Coke or a refreshing michelada to make it an unforgettable meal.
"
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10"
        colors="bg-white text-black"
        imageSrc=""
      />

      <Footer />
    </div>
  );
}
