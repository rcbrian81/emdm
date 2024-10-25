export default function Announcements({
  title,
  description,
  days,
  time,
  className,
  price,
  titleColor,
}) {
  return (
    <div
      className={`${className} bg-gray-100 h-[25vh] text-gray-900 text-center p-4 md:p-8 shadow-2xl flex flex-col justify-center items-center border-0`}
    >
      <h2
        className={`${titleColor} text-4xl md:text-6xl font-extrabold mb-2 md:mb-4 text-blue-400 animate-pulse`}
      >
        {title}
      </h2>
      <p className="text-lg md:text-2xl mb-1 md:mb-2 font-semibold">
        {days}, <span className="text-yellow-500">{time}</span>
      </p>
      <p className="text-base md:text-xl font-medium">
        Only{" "}
        <span className="text-yellow-500 text-2xl font-semibold">{price}</span>{" "}
        {description}
      </p>
    </div>
  );
}
