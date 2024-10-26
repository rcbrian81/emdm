import Image from "next/image";
import NavBar from "../components/NavBar";
import OutCrop from "../components/OutCrop";
import Footer from "../components/Footer";

export const metadata = {
  title: "Best Tacos in Oceanside - El Mundo De Mariscos",
  description:
    "Enjoy the best tacos in Oceanside, CA, at El Mundo de Mariscos! From carne asada to shrimp tacos, experience authentic Mexican flavor paired with refreshing drinks and a vibrant atmosphere.",
  keywords:
    "Oceanside tacos, best tacos in Oceanside CA, Mexican food Oceanside, authentic tacos Oceanside, El Mundo de Mariscos",
  author: "El Mundo de Mariscos",
  canonical: "https://mundodemariscos.com/tacos",
  openGraph: {
    title: "Best Tacos in Oceanside - El Mundo De Mariscos",
    description:
      "Experience the best tacos in Oceanside, CA, at El Mundo de Mariscos. Authentic flavors, fresh ingredients, and a vibrant atmosphere await you!",
    image: "",
    url: "https://mundodemariscos.com/tacos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Tacos in Oceanside - El Mundo De Mariscos",
    description:
      "Come for the best tacos in Oceanside, CA, at El Mundo de Mariscos! Fresh ingredients, authentic Mexican recipes, and a lively atmosphere await.",
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
          alt="Delicious Oceanside carne asada and adobada tacos served with fresh lime and a grilled pepper."
          className="object-cover w-full h-full"
          loading="eager"
        />
        <h1 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl font-bold p-4">
          Oceanside's Best Tacos – El Mundo De Mariscos
        </h1>
      </div>

      <OutCrop
        title="Our Oceanside Taco Treasures 🌮"
        text="At El Mundo De Mariscos, we serve the best tacos in Oceanside, CA. Every taco is crafted with fresh ingredients and authentic Mexican flavors, from carne asada to shrimp and adobada. Here’s a taste of our unique Oceanside taco lineup:"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-white text-black"
        imagePosition="right"
      />

      <ul className="flex flex-col md:flex-row w-screen md:h-[15vh] bg-white text-black text-4xl gap-5 justify-center items-center py-5">
        <li className="flex-1 h-full">
          <a
            href="#adobada"
            className="flex items-center justify-center w-full h-full bg-black text-white rounded-lg transition-all duration-300 transform hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800 shadow-md"
          >
            Adobada Tacos
          </a>
        </li>
        <li className="flex-1 h-full">
          <a
            href="#carne-asada"
            className="flex items-center justify-center w-full h-full bg-black text-white rounded-lg transition-all duration-300 transform hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800 shadow-md"
          >
            Carne Asada Tacos
          </a>
        </li>
        <li className="flex-1 h-full">
          <a
            href="#carnitas"
            className="flex items-center justify-center w-full h-full bg-black text-white rounded-lg transition-all duration-300 transform hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800 shadow-md"
          >
            Carnitas Tacos
          </a>
        </li>
        <li className="flex-1 h-full">
          <a
            href="#gobernador"
            className="flex items-center justify-center w-full h-full bg-black text-white rounded-lg transition-all duration-300 transform hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800 shadow-md"
          >
            Gobernador/Shrimp Tacos
          </a>
        </li>
      </ul>

      <OutCrop
        title="What Makes Our Tacos the Best in Oceanside? Spoiler Alert: Everything!"
        text="Wondering what makes El Mundo De Mariscos the home of the best tacos in Oceanside, CA? Here’s why locals and visitors alike rave about our tacos:"
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
        text="Celebrate taco night every Thursday at El Mundo De Mariscos! Our “Three Thursday Tacos” deal includes three mouthwatering tacos with your choice of fillings—perfectly paired with a refreshing soda for just $9. Or upgrade to our popular michelada for a little extra zing! The best Oceanside tacos at an unbeatable price—available every Thursday!"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-green-400 text-black"
        imageSrc="tacos.webp"
        imagePosition="right"
      />

      <OutCrop
        title="Carne Asada"
        id="carne-asada"
        text="Looking for the best carne asada tacos in Oceanside, CA? Visit El Mundo De Mariscos for tacos made with perfectly marinated, grilled steak, fresh cilantro, onions, and lime. Our authentic carne asada tacos pair perfectly with a cold drink, such as our micheladas or ice-cold sodas. Experience the authentic flavors of Mexico, right here in Oceanside."
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10"
        colors="bg-white text-black"
        imageSrc="tacos.webp"
      />

      <OutCrop
        title="Adobada (Al Pastor)"
        id="adobada"
        text="Discover the bold flavors of adobada tacos in Oceanside, CA, at El Mundo De Mariscos. Our tacos are crafted with marinated pork, slow-cooked to perfection, and topped with fresh cilantro and onions. Enjoy these tacos with a classic Mexican Coke for the full experience. Stop by today and try the best adobada tacos Oceanside has to offer!"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10"
        colors="bg-red-400 text-black"
        imageSrc="tacos3.webp"
        imagePosition="right"
        alt="6 mouth-watering tacos, 3 of which are Adobada tacos, also known as Al Pastor tacos."
      />

      <OutCrop
        title="Carnitas"
        id="carnitas"
        text="For tender and flavorful carnitas tacos in Oceanside, visit El Mundo De Mariscos! Our carnitas are slow-cooked, served with cilantro, onions, and lime. The best carnitas tacos in Oceanside pair perfectly with an ice-cold Mexican Coke. Join us on game days for a lively atmosphere and enjoy Oceanside's favorite tacos with music and drinks."
        rounded="rounded-l-3xl "
        margin="ml-20 mt-10 mb-10"
        colors="bg-blue-400 text-black"
      />

      <OutCrop
        title="Gobernador"
        id="gobernador"
        text="Taste the best shrimp tacos in Oceanside, CA, at El Mundo De Mariscos. Our gobernador tacos are filled with seasoned shrimp, wrapped in warm tortillas, and served with fresh ingredients. Experience Oceanside's best seafood tacos with a side of chips and salsa, and a refreshing drink to complete your meal!"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10 mb-10"
        colors="bg-blue-400 text-black"
        imageSrc="gobernador.webp"
        imagePosition="right"
      />

      <OutCrop
        title="Ready for Your Next Taco Adventure?"
        text="Your search for the best tacos in Oceanside ends here! Visit El Mundo De Mariscos to experience authentic Mexican tacos, refreshing drinks, and a vibrant atmosphere. Whether you're local or just visiting, come see why our Oceanside tacos are the talk of the town!"
        rounded="rounded-r-3xl "
        margin="mr-20 mt-10 mb-10"
        colors=""
        imagePosition="right"
      />

      <Footer />
    </div>
  );
}
