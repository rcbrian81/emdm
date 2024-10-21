export default function Welcome() {
  return (
    <div className="w-screen text-center min-h-screen">
      <h2 className="text-4xl sm:text-5xl font-bold w-full m-6 sm:m-8">
        Best Mexican Food & Mariscos In Oceanside Since 1997!
      </h2>
      <div className="flex flex-col md:flex-row w-full bg-white text-black h-auto md:h-[89vh] justify-center items-stretch">
        <div className="md:w-3/5 w-full p-8 sm:p-16 bg-white h-full">
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4">Welcome</h2>
          <p className="text-lg sm:text-2xl leading-relaxed">
            Established in 1997 by two immigrants from Oaxaca’s Zapotec towns,
            El Mundo de Mariscos began as a humble dream in Oceanside. A husband
            and wife, bound by tradition and a love of food, turned their
            journey into a family restaurant. After managing the iconic Angelo’s
            Burger, they opened their doors to share the rich flavors of their
            heritage. Over the years, their family has played a key role in
            shaping many of North County’s beloved Mexican restaurants, with El
            Mundo de Mariscos standing as their proud contribution to this
            legacy. Here, every dish is a tribute to their roots and the spirit
            of family that continues to thrive.
          </p>
        </div>

        <div className="md:w-2/5 w-full p-8 sm:p-16 bg-gray-800 text-white h-full md:h-[89vh] hidden md:block">
          <div className="flex flex-col justify-center items-center text-left space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Hours</h2>
              <p>Sun: 11:00 AM - 9:00 PM</p>
              <p>Mon: 11:00 AM - 8:00 PM</p>
              <p>Tue: 11:00 AM - 8:00 PM</p>
              <p>Wed: 11:00 AM - 8:00 PM</p>
              <p>Thu: 11:00 AM - 8:00 PM</p>
              <p>Fri: 11:00 AM - 9:00 PM</p>
              <p>Sat: 11:00 AM - 9:00 PM</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Address</h2>
              <address>2936 Oceanside Blvd, Oceanside CA, 92054</address>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Phone Number</h2>
              <a
                href="tel:+1234567890"
                className="text-yellow-300 hover:underline"
              >
                (760) 231-7355
              </a>
              <p>Order take out Now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
