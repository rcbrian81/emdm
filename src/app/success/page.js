export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Success!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Thank you for your order from El Mundo De Mariscos!
        </p>
        <p className="text-md text-gray-600">
          We’re preparing everything for delivery. Keep an eye on your phone –
          you’ll receive a text message soon with the details and estimated
          arrival time for your order. If you have any questions, feel free to
          contact us. (760) 231-7355
        </p>
      </div>
    </div>
  );
}
