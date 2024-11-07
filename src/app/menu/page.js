import NavBar from "../components/NavBar";
import CategorySection from "../components/CategorySection";
import ActionBar from "../components/ActionBar";
import Footer from "../components/Footer";

export const metadata = {
  title: "El Mundo De Mariscos Mexican Food Menu in Oceanside ",
  description:
    "Discover the Mexican Food in Oceanside, CA, at El Mundo de Mariscos. Our micheladas are crafted with ice-cold beer, fresh lime juice, and our signature homemade chili powder that customers love. Whether you're enjoying a game day or just craving a refreshing drink, our micheladas offer the perfect balance of flavor and spice, all served in a lively Mexican atmosphere with great music and unbeatable vibes.",

  author: "El Mundo de Mariscos",
  canonical: "https://mundodemariscos.com/menu",
  openGraph: {
    title: "El Mundo De Mariscos - Best Mexican Food in Oceanside",
    description:
      "Discover the best micheladas in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
    url: "https://mundodemariscos.com/menu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Mundo De Mariscos - Best Mexican Food in Oceanside",
    description:
      "Discover the Mexican Food in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
  },
};

export default function Menu() {
  // Sample data for each category

  const cockteles = [
    {
      name: "Campechana",
      price: "",
      description: "",
    },
    {
      name: "Cocktel de Mariscos",
      price: "",
      description: "",
    },
    {
      name: "Cocktel Camaron",
      price: "",
      description: "",
    },
    {
      name: "Cocktel Mixto",
      price: "",
      description: "",
    },
  ];

  const caldos = [
    {
      name: "Mariscos",
      price: "",
      description: "",
    },
    {
      name: "Levanta Muerto",
      price: "",
      description: "",
    },
    {
      name: "7 Mares",
      price: "",
      description: "",
    },
    {
      name: "Pescado",
      price: "",
      description: "",
    },
    {
      name: "Pescado Y Camaron",
      price: "",
      description: "",
    },
    {
      name: "Consome de Camaron",
      price: "",
      description: "",
    },
    {
      name: "Caldo Especial",
      price: "",
      description: "",
    },
    {
      name: "Pescado",
      price: "",
      description: "",
    },
  ];

  const Botanas = [
    {
      name: "Mariscada Fria",
      price: "",
      description: "",
    },
    {
      name: "Aguachiles",
      price: "",
      description: "",
    },
    {
      name: "Ceviche de Pescado",
      price: "",
      description: "",
    },
    {
      name: "Ceviche de Camaron",
      price: "",
      description: "",
    },
    {
      name: "Camarones Cucaracha",
      price: "",
      description: "",
    },
    {
      name: "Camarones Fritos",
      price: "",
      description: "",
    },
    {
      name: "Botana del Rey",
      price: "",
      description: "",
    },
  ];

  const Specialties = [
    {
      name: "Parillada",
      price: "",
      description: "",
    },
    {
      name: "Molcajete",
      price: "",
      description: "",
    },
  ];

  const Tostadas = [
    {
      name: "Tostada de Mariscos",
      price: "",
      description: "",
    },
    {
      name: "Tostada de Mixto",
      price: "",
      description: "",
    },
    {
      name: "Tostada de Camaron",
      price: "",
      description: "",
    },
    {
      name: "Ceviche de Pescado",
      price: "",
      description: "",
    },
  ];

  const Plates = [
    {
      name: "Mojara Frita",
      price: "",
      description: "",
    },
    {
      name: "Mojara Al Mojo De Ajo",
      price: "",
      description: "",
    },
    {
      name: "Frita Con Costa Azul",
      price: "",
      description: "",
    },
    {
      name: "Filete Al Mojo de Ajo",
      price: "",
      description: "",
    },
    {
      name: "Filete A La Plancha",
      price: "",
      description: "",
    },
    {
      name: "Filete Empanizado",
      price: "",
      description: "",
    },
    {
      name: "Filete Al Mundo",
      price: "",
      description: "",
    },
    {
      name: "Camarones Empanizado",
      price: "",
      description: "",
    },
    {
      name: "Camarones Al Mojo De Ajo",
      price: "",
      description: "",
    },
    {
      name: "Fajitas",
      price: "",
      description: "",
    },
    {
      name: "Plate",
      price: "",
      description: "",
    },
  ];

  const Tacos = [
    {
      name: "Taco",
      price: "",
      description: "",
    },
    {
      name: "Fish Taco",
      price: "",
      description: "",
    },
    {
      name: "Shredded Beef Taco",
      price: "",
      description: "",
    },
  ];

  const Nacos_Fires = [
    {
      name: "Nachos",
      price: "",
      description: "",
    },
    {
      name: "Fries",
      price: "",
      description: "",
    },
  ];

  const Buritos = [
    {
      name: "Burrito",
      price: "",
      description: "",
    },
    {
      name: "Burrito de Camaron",
      price: "",
      description: "",
    },
    {
      name: "Surf & Turf",
      price: "",
      description: "",
    },
    {
      name: "Bean & Cheese",
      price: "",
      description: "",
    },
    {
      name: "Veggie",
      price: "",
      description: "",
    },
  ];

  const Breakfeast = [
    {
      name: "Burrito",
      price: "",
      description: "",
    },
    {
      name: "Burrito de Camaron",
      price: "",
      description: "",
    },
  ];

  const Quesadillas = [
    {
      name: "Quesadilla",
      price: "",
      description: "",
    },
  ];

  const Qaxacenos = [
    {
      name: "Tayuda",
      price: "",
      description: "",
    },
    {
      name: "Fish Taco",
      price: "",
      description: "",
    },
    {
      name: "Shredded Beef Taco",
      price: "",
      description: "",
    },
  ];

  const Kids_Menu = [
    {
      name: "Chicken Nuggets & Fires",
      price: "",
      description: "",
    },
    {
      name: "Plain Chese Burger & Fries",
      price: "",
      description: "",
    },
  ];
  return (
    <div
      className="min-h-screen bg-gray-50  "
      style={{
        backgroundImage: "url('images/background8.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar colors="bg-white text-black" />
      <div className="container text-black mx-auto px-4 py-8 bg-white shadow-xl rounded-lg border border-gray-200 mt-12">
        <h1 className="text-5xl font-bold text-center mb-8">Our Menu</h1>

        {/* Grid for two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <CategorySection title="Specialties" items={Specialties} />
            <CategorySection title="Oaxaqueños" items={Qaxacenos} />
            <CategorySection title="Cockteles" items={cockteles} />
            <CategorySection title="Caldos" items={caldos} />
            <CategorySection title="Botanas" items={Botanas} />

            <CategorySection title="Quesadillas" items={Quesadillas} />
          </div>
          {/* Right Column */}
          <div className="space-y-12">
            <CategorySection title="Buritos" items={Buritos} />
            <CategorySection title="Tacos" items={Tacos} />
            <CategorySection title="Plates" items={Plates} />
            <CategorySection title="Naches/Fries" items={Nacos_Fires} />
            <CategorySection title="Tostadas" items={Tostadas} />
            <CategorySection title="Kids Menu" items={Kids_Menu} />
          </div>
        </div>
      </div>
      <ActionBar />
      <Footer />
    </div>
  );
}
