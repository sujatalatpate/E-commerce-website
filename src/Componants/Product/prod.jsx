import React, { useState } from 'react';

// Sample product data
const productsData = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description of Product 1',
    title: 'Title of Product 1',
    price: 100,
    images: ['/images/product1.jpg', '/images/product1-2.jpg'],
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description of Product 2',
    title: 'Title of Product 2',
    price: 150,
    images: ['/images/product2.jpg', '/images/product2-2.jpg'],
  },
  // Add more products here
];

function App() {
  const [products, setProducts] = useState(productsData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCartClick = () => {
    setSelectedProduct(null); // Clear the product details view
  };

  return (
    <div className="app">
      <Header cart={cart} handleCartClick={handleCartClick} />
      <div className="main-container">

        <ProductList products={products} handleProductClick={handleProductClick} />
        
        {selectedProduct ? (
          <ProductDetails product={selectedProduct} handleAddToCart={handleAddToCart} />
        ) : (
          <Cart cart={cart} />
        )}
      </div>
    </div>
  );
}

function Header({ cart, handleCartClick }) {
  return (
    <header>
      <div className="cart-icon" onClick={handleCartClick}>
        🛒 {cart.length}
      </div>
    </header>
  );
}

function ProductList({ products, handleProductClick }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
          <h3>{product.title}</h3>
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
}

function ProductDetails({ product, handleAddToCart }) {
  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <div className="product-images">
        {product.images.map((image, index) => (
          <div key={index} className="product-image">
            <img src={image} alt={`Product ${index}`} />
            <button onClick={() => handleAddToCart(product)}>
              <span>+</span> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div className="cart">
      <h2>Cart Items</h2>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <h3>{item.title}</h3>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default App;
