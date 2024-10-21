import Head from "next/head";

import NavBar from "./components/NavBar.js";
import SlideShow from "./components/SlideShow.js";
import ActionBar from "./components/ActionBar.js";
import Welcome from "./components/Welcome.js";
import Collage from "./components/Collage.js";
import Mariscos from "./components/Mariscos.js";
import Micheladas from "./components/Micheladas.js";
import Tacos_Burritos from "./components/Tacos&Burritos.js";
import Announcements from "./components/Announcements.js";
import Footer from "./components/Footer.js";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.webp" />
        <title>El Mundo De Mariscos || Best Mexican Food in Oceanside Ca</title>
        <meta
          name="description"
          content="Webiste for Ocanside,Ca's best Mexican Resturant El Mundo De mariscos. Offering Mexican Food, Mariscos, and the Best Micheladas. Amazing Tacos, Burritos, Aguachiles, Cockteles, Ceviche and much more."
        />
        <meta
          name="keywords"
          content="mexican, Oceanside, tacos, micheladas, mariscos, restaurant"
        />
        <meta property="og:title" content="El Mundo De Mariscos" />
        <meta
          property="og:description"
          content="Oceanside,Ca's Best Mexican & Mariscos Resturant."
        />
        <meta property="og:image" content="/images/favicon.webp" />
        <meta property="og:url" content="https://mundodemariscos.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div
        className="font-[family-name:var(--font-geist-sans)] w-screen h-screen"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-3xl hidden">
          El Mundo De Mariscos || Best Mexican Food In Oceanside
        </h1>
        <NavBar
          colors="bg-white text-black"
          className="h-[17vh] w-full border-b-4 border-red-600 md:border-red-600"
        />
        <SlideShow />
        <Collage />
        <ActionBar />
        <Welcome />

        <Announcements />
        <Mariscos />
        <Micheladas />
        <Tacos_Burritos />

        <Footer />
      </div>
    </>
  );
}
