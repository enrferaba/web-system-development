import CartItem from "./CartItem.jsx";

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="card">
      <h2>Cart</h2>

      {cart.map((item, index) => (
        <div key={index} className="item">
          <CartItem item={item} index={index} removeFromCart={removeFromCart} />
        </div>
      ))}

      <p className="total" data-testid="cart-total">
        Total: ${total}
      </p>
    </div>
  );
};

export default Cart;
