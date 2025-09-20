import { createContext } from "react";
import { useContext, useState } from "react";
import Cart from "../Pages/CartPage/cart";

const productContext = createContext();
// const useProduct = useContext(productContext);
export const useProduct = () => useContext(productContext);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [addedProductCount, setAddedProductCount] = useState(0);
  const[showCart, setShowCart] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setIsCartVisible((prev) => !prev); 
  };

  const handleCartClick = () => {
    setIsCartVisible(true); 
  };

  return (
    <div>
      <productContext.Provider
        value={{
          cart,
          setCart,
          products,
          setProducts,
          product,
          setProduct,
          selectedProduct,
          setSelectedProduct,
          handleProductClick,
          handleAddToCart,
          handleCartClick,
          itemCounts,
          setItemCounts,
          addedProductCount,
          setAddedProductCount,
          toggleCart,
          setCart,
          setShowCart,
          isCartVisible,
        setIsCartVisible,
        }}
      >
        
        {children}
        {/* {showCart && <Cart />} */}
      </productContext.Provider>
    </div>
  );
}
export default ProductProvider;
