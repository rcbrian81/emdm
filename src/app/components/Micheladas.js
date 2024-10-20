import Image from "next/image";

export default function Micheladas() {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-[50vh] bg-black text-right">
      <div className="relative w-full md:w-2/5 h-[40vh] md:h-full">
        <Image
          src="/images/miche2.jpg"
          alt="Ice cold red/orange michelada served in a large glass Tankard cup. The cup is seating with precipitation and a resturant dining area in the background with chips and beer."
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex-1 p-8 md:p-16 w-full md:w-3/5">
        <h3 className="text-3xl md:text-5xl m-4 md:m-8 text-white">
          Micheladas
        </h3>
        <p className="text-lg md:text-2xl text-white">
          Beloved by our customers, our micheladas are a refreshing mix of
          Clamato, tomato juice, and a full 12oz beer, all perfectly balanced
          with our house-made chili powder. Cold, bold, and uniquely flavorful—
          this Mexican classic is a must-try.
        </p>
      </div>
    </div>
  );
}
