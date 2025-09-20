import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProduct } from "../../context.js/productContext";
import style from "./navbar.module.css";

function Navbar() {
  const {handleCartClick,addedProductCount, toggleCart, } = useProduct();
  return (
    <>
    <div className={style.navContainer}>
      <div className={style.leftPart}>
        <p>Shopi</p>
        <Link to="/category/all" className={style.linkText}>All</Link>
        <Link to="/category/clothes" className={style.linkText}>Clothes</Link>
        <Link to="/category/electronics" className={style.linkText}>Electronics</Link>
        <Link to="/category/furniture" className={style.linkText}>Furniture</Link>
        <Link to="/category/toys" className={style.linkText}>Toys</Link>
      </div>
      <div className={style.rightPart}>
      <Link to="/order" className={style.right}>My Orders</Link>
        <p>My Account</p>
        <div onClick={toggleCart}>
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