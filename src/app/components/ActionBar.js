export default function ActionBar() {
  return (
    <div className="fixed flex bottom-0 z-50  w-screen h-[7vh] bg-black justify-center items-center text-2xl">
      <a
        href="tel:+17602317355"
        className="flex-1 text-center hover:text-yellow-400"
      >
        Call Now
      </a>
      <a
        target="blank"
        href="https://maps.app.goo.gl/4bt9FmL5GN797eSX9"
        className="flex-1 text-center hover:text-yellow-400"
      >
        Directions Now
      </a>
      <a href="/menu" className="flex-1 text-center hover:text-yellow-400">
        Menu Now
      </a>
    </div>
  );
}
