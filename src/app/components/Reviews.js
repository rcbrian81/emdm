"use client";

import { useEffect, useRef } from "react";
import Review from "./Review";

const reviews = [
  { name: "John Doe", rating: 5, comment: "Amazing food, loved it!" },
  { name: "Jane Smith", rating: 4, comment: "Great service!" },
  { name: "Mary Johnson", rating: 5, comment: "Best seafood in town!" },
  { name: "James Brown", rating: 3, comment: "Good experience!" },
  { name: "John Doe", rating: 5, comment: "Amazing food, loved it!" },
  { name: "Jane Smith", rating: 4, comment: "Great service!" },
  { name: "Mary Johnson", rating: 5, comment: "Best seafood in town!" },
  { name: "James Brown", rating: 3, comment: "Good experience!" },
  { name: "John Doe", rating: 5, comment: "Amazing food, loved it!" },
  { name: "Jane Smith", rating: 4, comment: "Great service!" },
  { name: "Mary Johnson", rating: 5, comment: "Best seafood in town!" },
  { name: "James Brown", rating: 3, comment: "Good experience!" },
  { name: "John Doe", rating: 5, comment: "Amazing food, loved it!" },
  { name: "Jane Smith", rating: 4, comment: "Great service!" },
  { name: "Mary Johnson", rating: 5, comment: "Best seafood in town!" },
  { name: "James Brown", rating: 3, comment: "Good experience!" },
  { name: "John Doe", rating: 5, comment: "Amazing food, loved it!" },
  { name: "Jane Smith", rating: 4, comment: "Great service!" },
  { name: "Mary Johnson", rating: 5, comment: "Best seafood in town!" },
  { name: "James Brown", rating: 3, comment: "Good experience!" },
  // Add more reviews
];

export default function ReviewsSlider() {
  const scrollContainer = useRef(null);

  // Infinite scroll effect
  useEffect(() => {
    const container = scrollContainer.current;
    let scrollAmount = 0;

    const scroll = () => {
      scrollAmount += 1;
      container.scrollLeft = scrollAmount;
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0; // Reset to create infinite scroll effect
      }
    };

    const interval = setInterval(scroll, 50); // Adjust speed here

    return () => clearInterval(interval); // Clean up
  }, []);

  return (
    <div className="overflow-hidden h-[50vh]">
      <div
        className="flex items-center space-x-10 overflow-x-auto w-full h-full border-8 border-red-400"
        ref={scrollContainer}
      >
        {reviews.map((review, index) => (
          <Review
            key={index}
            name={review.name}
            rating={review.rating}
            comment={review.comment}
            className="w-[100vw]"
          />
        ))}
      </div>
    </div>
  );
}
