import { useState } from "react";
import ProductList from "./products/ProductList.jsx";
import Cart from "./carts/Cart.jsx";
import "./App.css";


const App = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 0, name: 'Laptop', price: 1000 },
    { id: 1, name: 'Mouse', price: 20 },
    { id: 2, name: 'Keyboard', price: 50 },
    { id: 3, name: 'Screen', price: 150 }
  ];

  const addToCart = (product) => {
    setCart(cart.concat(product));
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1 className="title">React Shopping Cart</h1>

      <div className="content">
        <ProductList products={products} addToCart={addToCart} />
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
};

export default App;
