import MenuItem from "./MenuItem";

export default function CategorySection({ title, items = [], onAddToCart }) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <div className="space-y-6">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              price={item.price}
              description={item.description}
              imageUrl={item.imageUrl} // Optional image support
              onAddToCart={onAddToCart}
              foodID={item.id}
            />
          ))
        ) : (
          <p>No items available for this category.</p> // Fallback message
        )}
      </div>
    </section>
  );
}
