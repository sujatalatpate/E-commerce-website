import { useEffect, useState } from "react";
import style from "./myOrder.module.css"
import { Link } from "react-router-dom";

function OrderPage() {
  const [cart, setCart] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    // Get cart and itemCounts from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const storedItemCounts = JSON.parse(localStorage.getItem("itemCounts"));

    if (storedCart && storedItemCounts) {
      setCart(storedCart);
      setItemCounts(storedItemCounts);
    }
  }, []);

  // Calculate the total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const quantity = itemCounts[item.id] || 1;
      return total + item.price * quantity;
    }, 0);
  };

  return (
    <div>
      <h1>MyOrder</h1>

      <div><Link to="/"><img
            src="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
            width="30px"
            height="30px"
          /></Link>
          
      </div>
      <div>
        {cart.map((item) => (
          <div className={style.items}>
          <div>
            <img src={item.images} width="85px" height="100px" />
          </div>
          <div>
            <p style={{ fontSize: "12px", marginLeft: "15px" }}>
              {item.title}
            </p>
            <p>${item.price}</p>
            
            <p className={style.price}> {itemCounts[item.id] || 1}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p>Total: ${calculateTotalPrice().toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OrderPage;
