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
    addedProductCount
  } = useProduct();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Manage the added products to prevent adding the same one twice
  const [addedProducts, setAddedProducts] = useState(new Set());
  
  // We will manage the plus/check toggle for each product
  const [productIcons, setProductIcons] = useState({});

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

  // Toggle plus/check for a specific product
  const togglePlusCheck = (productId) => {
    setProductIcons((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle the current icon for the product
    }));
  };

  // Handle adding a product to the cart
  const handleProductAdd = (product) => {
    if (!addedProducts.has(product.id)) {
      handleAddToCart(product);
      setAddedProducts((prev) => new Set(prev).add(product.id)); // Add product ID to the set
      togglePlusCheck(product.id); // Toggle the icon when adding to cart
      setAddedProductCount(addedProductCount + 1);
    }
    console.log("Product clicked:", product);
  };

  return (
    <>
      <div className={style.imageGallery}>
        {products.map((product) => (
          <div key={product.id} className={style.productContainer}>
            <div className={style.imageItem}>
              <div onClick={() => handleProductClick(product)}>
                <img
                  src={product.images}
                  alt={product.title}
                  className={style.image}
                />
              </div>

              {/* Add to Cart button with plus/check toggle */}
              <button
                className={style.add}
                onClick={() => handleProductAdd(product)} // Use the new handleProductAdd
                disabled={addedProducts.has(product.id)} // Disable the button if the product is already added
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
