import {  useEffect } from "react";
import { useProduct } from "../../context.js/productContext";
import style from "./cart.module.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart, itemCounts, setItemCounts, isCartVisible,setIsCartVisible } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const initialItemCounts = cart.reduce(
      (acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = 1; 
        }
        return acc;
      },
      { ...itemCounts }
    ); 
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

   
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[id]; 
      return newCounts;
    });
  };

  
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const quantity = itemCounts[item.id] || 1; 
      return total + item.price * quantity;
    }, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('itemCounts', JSON.stringify(itemCounts));

    console.log("Navigating to Order Page...");
    navigate('/order'); 
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
                      <p style={{ fontSize: "17px", marginLeft: "15px" }}>
                        {item.title}
                      </p>
                      <p style={{fontSize: "17px"}}>${item.price}</p>
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
                        onClick={() => handleRemoveItem(item.id)} 
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
