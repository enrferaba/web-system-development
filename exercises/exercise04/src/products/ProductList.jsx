import ProductItem from "./ProductItem.jsx";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="card">
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id} className="item">
          <ProductItem product={product} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
