export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row h-[40vh] bg-black text-white p-8 space-y-6 md:space-y-0 md:space-x-12 shadow-lg">
      <div className="flex-1 text-center">
        <p className="text-2xl font-bold mb-3">Call Us</p>
        <a
          href="tel:+1234567890"
          className="text-red-500 hover:underline text-lg"
        >
          (760) 231-7355
        </a>
      </div>
      <div className="flex-1 text-center">
        <p className="text-2xl font-bold mb-3">Directions / Map</p>
        <a
          href="https://goo.gl/maps/example"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:underline text-lg"
        >
          Get Directions
        </a>
      </div>
      <div className="flex-1 text-center">
        <p className="text-2xl font-bold mb-3">Hours</p>
        <p className="text-lg">
          Sun: <time dateTime="11:00">11:00AM</time> -{" "}
          <time dateTime="21:00">9:00PM</time>
        </p>
        <p className="text-lg">
          Mon: <time dateTime="11:00">11:00AM</time> -{" "}
          <time dateTime="20:00">8:00PM</time>
        </p>
        <p className="text-lg">
          Tue: <time dateTime="11:00">11:00AM</time> -{" "}
          <time dateTime="20:00">8:00PM</time>
        </p>
        <p className="text-lg">
          Wed: <time dateTime="11:00">11:00AM</time> -{" "}
          <time dateTime="20:00">8:00PM</time>
        </p>
        <p className="text-lg">
          Thur: <time dateTime="11:00">11:00AM</time> -{" "}
          <time dateTime="20:00">8:00PM</time>
        </p>
        <p className="text-lg">
          Fri: <time dateTime="11:00">11:00AM</time> -{" "}
          <time dateTime="21:00">9:00PM</time>
        </p>
        <p className="text-lg">
          Sat: <time dateTime="11:00">11:00AM</time> -{" "}
          <time dateTime="21:00">9:00PM</time>
        </p>
      </div>

      <div className="flex-1 text-center">
        <p className="text-2xl font-bold mb-3">Contact Us</p>
        <a
          href="mailto:info@example.com"
          className="text-red-500 hover:underline text-lg"
        >
          elmundodemariscos@gmail.com
        </a>
      </div>
    </footer>
  );
}
