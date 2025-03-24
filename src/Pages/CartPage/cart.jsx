import { useState, useEffect } from "react";
import { useProduct } from "../../context.js/productContext";
import style from "./cart.module.css";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart, itemCounts, setItemCounts } = useProduct();
  const [isCartVisible, setIsCartVisible] = useState(true);
  const navigate = useNavigate();

  // Update itemCounts whenever cart changes
  useEffect(() => {
    const initialItemCounts = cart.reduce(
      (acc, item) => {
        // Set initial counts, but retain previous counts if the item already exists
        if (!acc[item.id]) {
          acc[item.id] = 1; // Default to 1 if item doesn't exist yet
        }
        return acc;
      },
      { ...itemCounts }
    ); // Merge with current itemCounts to persist old quantities
    setItemCounts(initialItemCounts);
  }, [cart]);

  const handleCartClose = () => {
    setIsCartVisible(false);
  };

  const handleCountInc = (id) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }));
  };

  const handleCountDec = (id) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] > 1 ? prevCounts[id] - 1 : 1,
    }));
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    // Remove item count state
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[id]; // Remove item count for the removed product
      return newCounts;
    });
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const quantity = itemCounts[item.id] || 1; // Fallback to 1 if undefined
      return total + item.price * quantity;
    }, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // Store the cart and itemCounts data in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('itemCounts', JSON.stringify(itemCounts));

    console.log("Navigating to Order Page...");
    navigate('/order'); // Programmatically navigate to the OrderPage
  };

  return (
    <div>
      {isCartVisible && (
        <div className={style.CartDetails}>
          <div className={style.top}>
            <p>My Order</p>
            <div onClick={handleCartClose}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/9248/9248474.png"
                alt="close"
              />
            </div>
          </div>
          <div className={style.container}>
            <div>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className={style.items}>
                    <div>
                      <img src={item.images} width="85px" height="100px" />
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", marginLeft: "15px" }}>
                        {item.title}
                      </p>
                      <p>${item.price}</p>
                      <div className={style.count}>
                        <div
                          onClick={() => handleCountDec(item.id)}
                          className={style.incCount}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/512/512619.png"
                            width="10px"
                            height="10px"
                          />
                        </div>
                        <div className={style.counter}>
                          {itemCounts[item.id] || 1}{" "}
                          {/* Fallback to 1 if undefined */}
                        </div>
                        <div
                          onClick={() => handleCountInc(item.id)}
                          className={style.decCount}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/864/864380.png"
                            width="10px"
                            height="10px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={style.cartImage}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/9248/9248474.png"
                        alt="remove"
                        onClick={() => handleRemoveItem(item.id)} // Remove the item when clicked
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.total}>
              <div className={style.bottom}>
                <div className={style.price}>
                  <p>Total:</p>
                  <p>${calculateTotalPrice().toFixed(2)}</p>
                </div>
                <div className={style.btn}>
                  <button type="button" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
