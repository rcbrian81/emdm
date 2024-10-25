import Image from "next/image";

export default function Mariscos() {
  return (
    <div className="flex flex-col md:flex-row bg-blue-400 w-full h-auto md:h-[50vh]">
      <div className="p-8 md:p-16 w-full md:w-3/5">
        <h3 className="text-3xl md:text-5xl m-4 md:m-8">Mariscos</h3>
        <p className="text-lg md:text-2xl">
          Discover the best-kept secret of Mexican cuisine right here in
          Oceanside, CA. At El Mundo De Mariscos, we offer authentic flavors
          that go beyond the familiar, unveiling the hidden gems of Mexican
          food. Join us and experience a fresh take on Oceanside’s Mexican
          dining scene.
        </p>
      </div>

      <div className="relative w-full md:w-2/5 h-[40vh] md:h-full">
        <Image
          src="/images/mariscada.webp"
          alt="A large plate stuffed with ceviche,crab,oysters, muscles, scalops avocado, lime, cucumbers and orage sclices. Mexican seafood dish called Mariscada. "
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
