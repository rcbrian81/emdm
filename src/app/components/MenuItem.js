export default function MenuItem({ name, price, description, imageUrl }) {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
        />
      )}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <span className="text-xl font-bold">{price}</span>
      </div>
    </div>
  );
}
