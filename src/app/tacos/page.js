import Image from "next/image";

import NavBar from "../components/NavBar";
import OutCrop from "../components/OutCrop";
import Footer from "../components/Footer";

export const metadata = {
  title: "El Mundo De Mariscos Best Tacos in Oceanside ",
  description:
    "Indulge in the authentic taste of Mexico with our delicious tacos at El Mundo de Mariscos. From classic carne asada to flavorful shrimp and fish tacos, each one is prepared with fresh ingredients and bold flavors. Pair your tacos with one of our famous micheladas or a refreshing Mexican Coke, and enjoy the vibrant atmosphere during game days with Banda music and more. Whether you're looking for a quick bite or a full meal, our tacos and cold drinks are perfect for any occasion.",
  keywords:
    "Tacos, Oceanside, best Tacos, Mexican Food, Mexican drinks, mariscos, El Mundo de Mariscos",
  author: "El Mundo de Mariscos",
  canonical: "https://mundodemariscos.com/tacos",
  openGraph: {
    title: "El Mundo De Mariscos - Best Tacos in Oceanside",
    description:
      "Discover the best Tacos in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
    url: "https://mundodemariscos.com/tacos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Mundo De Mariscos - Best Tacos in Oceanside",
    description:
      "Discover the best Tacos in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
  },
};

export default function Tacos() {
  return (
    <div className="text-black bg-white ">
      <NavBar
        colors="bg-white text-black"
        className={" text-black fixed border-b-4 border-black"}
      />
      <div className="relative w-full h-screen">
        <img
          src="/images/tacos.webp"
          alt="6 Carne Asada & Adobada Tacos served with lime and a perfectley cooked pepper."
          className="object-cover w-full h-full"
          loading="eager"
        />

        <h1 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl font-bold p-4">
          Oceanside's Best Tacos
        </h1>
      </div>

      <OutCrop
        title="Our Oceanside Taco Treasures 🌮"
        text="Each taco we make is a love letter to Mexican cuisine. With every bite, you’ll taste the passion and tradition we put into every single tortilla. Here’s a taste of our taco lineup:"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-white text-black"
        imagePosition="right"
      />

      <ul className="flex flex-col md:flex-row w-screen md:h-[15vh] bg-black text-white text-4xl gap-10 justify-center items-center">
        <li className="flex-1 h-full">
          <a
            href="#adobada"
            className="flex items-center justify-center w-full h-full hover:text-yellow-500"
          >
            Adobada
          </a>
        </li>
        <li className="flex-1 h-full">
          <a
            href="#carne-asada"
            className="flex items-center justify-center w-full h-full hover:text-yellow-500"
          >
            Carne Asada
          </a>
        </li>
        <li className="flex-1 h-full">
          <a
            href="#carnitas"
            className="flex items-center justify-center w-full h-full hover:text-yellow-500"
          >
            Carnitas
          </a>
        </li>
        <li className="flex-1 h-full">
          <a
            href="#gobernador"
            className="flex items-center justify-center w-full h-full hover:text-yellow-500"
          >
            Gobernador/Shrimp
          </a>
        </li>
      </ul>

      <OutCrop
        title="What Makes Our Tacos the Best in Oceanside? Spoiler Alert: Everything!"
        text="It’s no accident that people call us the ‘best tacos in Oceanside.’
        Here’s what sets our tacos apart:"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-white text-black"
        imagePosition="right"
      >
        <ul>
          <li>
            <strong>Fresh Ingredients, Always 🌿:</strong> From the salsa to the
            tortillas, we use only the freshest, locally sourced ingredients.
          </li>
          <li>
            <strong>Authentic Recipes Passed Down 📜:</strong> Our recipes come
            straight from the heart of Mexico, brought to Oceanside by a family
            that lives and breathes Mexican food.
          </li>
          <li>
            <strong>Made with Love 💖:</strong> Every taco is crafted with care,
            ensuring each bite brings a little taste of home.
          </li>
        </ul>
      </OutCrop>
      <OutCrop
        title="Three Thursday Tacos"
        text="Join us every Thursday for our Three Thursday Tacos deal! Enjoy 3 delicious tacos of your choice, perfectly paired with a refreshing soda for just $9. Feeling like something with a little more kick? Upgrade your drink to our famous michelada for only $15. It’s the perfect combo to enjoy a taste of authentic Mexican flavor and quench your thirst!

Don’t miss out—this deal is available all day Thursday!"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-green-400 text-black"
        imageSrc="tacos.webp"
        imagePosition="right"
      />

      <OutCrop
        title="Carne Asada"
        id="carne-asada"
        text="Looking for the best carne asada tacos in Oceanside? Look no further than El Mundo de Mariscos! Our carne asada tacos are made with juicy, marinated steak, grilled to perfection and served on warm tortillas, topped with fresh cilantro, onions, and a squeeze of lime for that authentic Mexican flavor. Whether you're craving a quick taco or a full meal, our carne asada tacos are sure to satisfy.

Pair your meal with a refreshing drink from our tray of ice-cold sodas, a cold beer, or one of our famous micheladas. Want the perfect pairing? Try our famous micheladas – a zesty mix of beer, lime, and spices – or stop in for happy hour with $4 beers. Experience the vibrant Mexican atmosphere with live Banda and mariachi music, making your meal even more memorable."
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10"
        colors="bg-white text-black"
        imageSrc="tacos.webp"
      />
      <OutCrop
        title="Adobada (Al Pastor)"
        id="adobada"
        text="Discover the rich, bold flavors of adobada tacos at El Mundo de Mariscos in Oceanside. Our adobada tacos are crafted with tender pork, marinated in a traditional blend of spices and slow-cooked to perfection. Each taco is topped with fresh cilantro, onions, and a squeeze of lime, wrapped in a warm tortilla for that authentic taste of Mexico.
Each bite delivers authentic Mexican flavors that are perfectly complemented by an ice-cold Mexican Coca-Cola served in a classic glass bottle. Choose between the regular size or the refreshing 1/2 liter—both made with real cane sugar to provide the ideal balance to the rich, bold taste of our adobada tacos."
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-red-400 text-black"
        imageSrc="tacos3.webp"
        imagePosition="right"
        alt="6 mouth watering tacos. 3 of which are Adobada tacos also known as Al Pasotr Tacos."
      />
      <OutCrop
        title="Carnitas"
        id="carnitas"
        text="For the best carnitas tacos in Oceanside, look no further than El Mundo de Mariscos. Our crispy yet tender carnitas are slow-cooked and served with fresh cilantro, onions, and lime. To take your meal to the next level, pair it with an iconic Mexican Coca-Cola in a glass bottle. Whether you choose the regular size or the satisfying 1/2 liter, nothing beats the crisp, refreshing taste of Mexican Coke, made with real cane sugar, alongside your favorite tacos.

Join us for game days, enjoy some chips and salsa, and experience the lively atmosphere with Banda and mariachi music. Come in today for a true taste of Mexico with the best carnitas tacos and a classic Mexican Coca-Cola."
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10 mb-10"
        colors="bg-blue-400 text-black"
      />
      <OutCrop
        title="Gobernador"
        id="gobernador"
        text="For the best carnitas tacos in Oceanside, look no further than El Mundo de Mariscos. Our crispy yet tender carnitas are slow-cooked and served with fresh cilantro, onions, and lime. To take your meal to the next level, pair it with an iconic Mexican Coca-Cola in a glass bottle. Whether you choose the regular size or the satisfying 1/2 liter, nothing beats the crisp, refreshing taste of Mexican Coke, made with real cane sugar, alongside your favorite tacos.

Join us for game days, enjoy some chips and salsa, and experience the lively atmosphere with Banda and mariachi music. Come in today for a true taste of Mexico with the best carnitas tacos and a classic Mexican Coca-Cola."
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10 mb-10"
        colors="bg-blue-400 text-black"
        imageSrc="gobernador.webp"
        imagePosition="right"
      />

      <OutCrop
        title="Ready for Your Next Taco Adventure?"
        text="Don’t just read about it – come taste what everyone’s talking about! Whether you’re a local or just visiting, El Mundo De Mariscos is the ultimate spot for tacos in Oceanside. Bring your appetite and let us do the rest. 🌮"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10 mb-10"
        colors=""
        imagePosition="right"
      />

      <Footer />
    </div>
  );
}
