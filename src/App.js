import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componants/Navbar/navbar";
import ProductProvider from "./context.js/productContext";
import Home from "./Pages/HomePage/home";
import Cart from "./Pages/CartPage/cart";
import OrderPage from "./Pages/MyOrders/myOrders";
import Product from "./Componants/Product/product";

function App() {

  return (
    <div className="App">
      <ProductProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="category/:categoryName" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </Router>
      </ProductProvider>
      
    </div>
  );
}

export default App;
