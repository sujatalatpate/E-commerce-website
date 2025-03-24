import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProduct } from "../../context.js/productContext";
import style from "./navbar.module.css";

function Navbar() {
  const {handleCartClick,addedProductCount} = useProduct();
  return (
    <>
    <div className={style.navContainer}>
      <div className={style.leftPart}>
        <p>Shopi</p>
        <p>All</p>
        <p>Clothes</p>
        <p>Electronics</p>
        <p>Furniture</p>
        <p>Toys</p>
      </div>
      <div className={style.rightPart}>
      <p>My Orders</p>
        <p>My Account</p>
        <div onClick={handleCartClick}>
       <img src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png" /> 
        </div>
        <p>{addedProductCount}</p>
      </div>
    </div>
    <Outlet />
    </>
  );

}
export default Navbar;