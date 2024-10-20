"use client"; // This component is client-side only

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function Modal() {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  const router = useRouter();

  // Function to close the modal
  const closeModal = () => {
    router.push("/", { shallow: true });
  };

  // If no image query is present, don't render the modal
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={closeModal} // Clicking anywhere will close the modal
    >
      <div className="relative w-[100vw] h-[100vh]">
        <Image
          src={image}
          alt="Expanded Image"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
        <button
          className="absolute top-4 right-4 text-white text-xl"
          onClick={closeModal}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
