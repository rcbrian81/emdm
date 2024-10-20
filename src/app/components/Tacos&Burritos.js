import Image from "next/image";

export default function Tacos_Burritos() {
  return (
    <div className="flex flex-col md:flex-row bg-white w-full h-auto md:h-[50vh] text-black">
      <div className="p-8 md:p-16 w-full md:w-3/5">
        <h3 className="text-3xl md:text-5xl m-4 md:m-8">Mexican Staples</h3>
        <p className="text-lg md:text-2xl">
          Our menu proudly features the beloved staples of Mexican
          cuisine—tacos, burritos, and quesadillas. Prepared with the same care
          and authenticity as everything we serve, these classics are perfect
          for those seeking familiar, flavorful favorites.
        </p>
      </div>

      <div className="relative w-full md:w-2/5 h-[40vh] md:h-full">
        <Image
          src="/images/tacos.webp"
          alt="Tacos, burrito, and quesadillas all on a single table."
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
