export default function Announcements() {
  return (
    <div className="bg-gray-100 h-[25vh] text-gray-900 text-center p-8 shadow-2xl flex flex-col justify-center items-center border-0">
      <h2 className="text-6xl font-extrabold mb-4 text-blue-400 animate-pulse">
        Happy Hour 🍻
      </h2>
      <p className="text-2xl mb-2 font-semibold">
        Monday to Friday, <span className="text-yellow-500">4pm - 7pm</span>
      </p>
      <p className="text-xl font-medium">
        Only <span className="text-yellow-500">$4</span> for 12 oz beers & great
        food!
      </p>
    </div>
  );
}
