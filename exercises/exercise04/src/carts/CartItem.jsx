const CartItem = ({ item, index, removeFromCart }) => {
  return (
    <div data-testid={`cart-item-${index}`} className="cart-row">
      <span>{item.name} — ${item.price}</span>

      <button
        data-testid={`remove-${index}`}
        onClick={() => removeFromCart(index)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
