export default function Welcome() {
  return (
    <div className="w-screen text-center  ">
      <h2 className="text-4xl sm:text-5xl font-bold w-full m-6 sm:m-8">
        Best Mexican Food & Mariscos In Oceanside Since 1997!
      </h2>
      <div className="flex flex-col md:flex-row w-full h-full bg-white text-black  md:h-[89vh] justify-center items-stretch">
        <div className="md:w-3/5 w-full p-8 sm:p-16 bg-white h-full">
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4">Welcome</h2>
          <p className="text-lg sm:text-2xl leading-relaxed">
            At El Mundo De Mariscos, we serve the finest Mexican food Oceanside
            has to offer. Our commitment to fresh ingredients and authentic
            recipes makes us a favorite for locals and visitors alike.
          </p>
        </div>

        <div className="md:w-2/5 w-full p-8 sm:p-16 bg-gray-800 text-white h-full md:h-[89vh]  md:block">
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
              <br></br>
              <p>Keep scrolling to learn more about our foods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
