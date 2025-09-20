import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./product.module.css";
import { useProduct } from "../../context.js/productContext";

function Product() {
  const {
    products,
    setProducts,
    handleProductClick,
    handleAddToCart,
    setAddedProductCount,
    addedProductCount,
    setShowCart,
    isCartVisible,
        setIsCartVisible,
  } = useProduct();
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [addedProducts, setAddedProducts] = useState(new Set());
  
  const [productIcons, setProductIcons] = useState({});

  const filteredProducts = categoryName === "all" || !categoryName
  ? products
  : products.filter(
      (product) =>
        product.category.name.toLowerCase() === categoryName.toLowerCase()
    );

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading products");
        setLoading(false);
      });
  }, []);

  const togglePlusCheck = (productId) => {
    setProductIcons((prev) => ({
      ...prev,
      [productId]: !prev[productId], 
    }));
  };

  
  const handleProductAdd = (product) => {
    if (!addedProducts.has(product.id)) {
      handleAddToCart(product);
      setAddedProducts((prev) => new Set(prev).add(product.id)); 
      togglePlusCheck(product.id); 
      setAddedProductCount(addedProductCount + 1);
    setIsCartVisible(true);
    }
    console.log("Product clicked:", product);
  };

  return (
    <>
      <div className={style.imageGallery}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={style.productContainer}>
            <div className={style.imageItem}>
              <div onClick={() => handleProductClick(product)}>
                <img
                  src={product.images}
                  alt={product.title}
                  className={style.image}
                />
              </div>

              <button
                className={style.add}
                onClick={() => handleProductAdd(product)} 
                disabled={addedProducts.has(product.id)} 
              >
                <span className={style.icon}>
                  {productIcons[product.id] ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/17554/17554905.png"
                      alt="check icon"
                      className={style.iconImage}
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                      alt="plus icon"
                      className={style.iconImage}
                    />
                  )}
                </span>
              </button>
              <button className={style.name}>{product.category.name}</button>
            </div>

            <div className={style.details}>
              <p>{product.title}</p>
              <h3>{product.price}$</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Product;
