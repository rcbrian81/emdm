import Image from "next/image";

export default function Micheladas() {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-[50vh] bg-black text-right">
      <div className="relative w-full md:w-2/5 h-[40vh] md:h-full">
        <a href="micheladas">
          <Image
            src="/images/miche2.webp"
            alt="Ice cold red/orange michelada served in a large glass Tankard cup. The cup is seating with precipitation and a resturant dining area in the background with chips and beer."
            layout="fill"
            objectFit="cover"
          />
        </a>
      </div>

      <div className="flex-1 p-8 md:p-16 w-full md:w-3/5">
        <h3 className="text-3xl md:text-5xl m-4 md:m-8 text-white">
          <a href="micheladas">Micheladas</a>
        </h3>
        <p className="text-lg md:text-2xl text-white">
          A customer favorite, our Micheladas blend Clamato, tomato juice, and a
          full 12oz beer, perfected with our house-made chili powder. Cold,
          bold, and flavorful—this Mexican classic at El Mundo De Mariscos in
          Oceanside, CA, is a must-try."
        </p>
      </div>
    </div>
  );
}
