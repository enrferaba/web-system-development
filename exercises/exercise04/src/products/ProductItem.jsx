const ProductItem = ({ product, addToCart }) => {
  return (
    
    <div className="product-row">
      <span>{product.name} — ${product.price}</span>

      <button 
        data-testid={`add-${product.id}`} 
        onClick={() => addToCart(product)}
      >
        Add
      </button>
    </div>
  );
};



export default ProductItem;
