export default function OutCrop({
  title,
  text,
  className,
  rounded,
  margin,
  colors,
  imageSrc,
  imagePosition = "left",
  alt,
}) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
      } items-center justify-center h-auto p-8 ${className} ${rounded} ${margin} ${colors}`}
    >
      {imageSrc && (
        <img
          src={`/images/${imageSrc}`}
          alt={alt}
          className="w-full md:w-1/2 h-64 md:h-3/4 object-cover rounded-lg shadow-lg mb-4 md:mb-0 mx-4"
        />
      )}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-5xl font-bold  mb-4">{title}</h2>
        <p className="text-md md:text-lg leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
