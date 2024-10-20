// components/Review.js
export default function Review({ name, rating, comment }) {
  return (
    <div className="w-64 flex-shrink-0 bg-white shadow-lg rounded-lg p-4 m-2 h-1/2 w-full">
      <h3 className="font-bold text-lg">{name}</h3>
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 mr-2">★ {rating}</span>
      </div>
      <p>{comment}</p>
    </div>
  );
}
