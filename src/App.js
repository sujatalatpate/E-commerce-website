import "./App.css";
// import { createBrowserRouter, RouterProvider, Routes, Router, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componants/Navbar/navbar";
import ProductProvider from "./context.js/productContext";
import Home from "./Pages/HomePage/home";
import Cart from "./Pages/CartPage/cart";
import OrderPage from "./Pages/MyOrders/myOrders";

function App() {
  // const browserRouter = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Navbar />,
  //     children: [
  //       { index: true, element: <Home /> },
  //       { path: "/cart", element: <Cart /> },
  //       { path: "/order", element: <OrderPage /> },
  //     ],
  //   },
  // ]);

  return (
    <div className="App">
      <ProductProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </Router>
      </ProductProvider>
    </div>
  );
}

export default App;
