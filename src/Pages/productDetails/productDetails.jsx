
import { useProduct } from "../../context.js/productContext";
import style from "./productDetails.module.css";

function ProductDetails() {
  const { handleCartClick, selectedProduct } = useProduct();
 
  return (
    <div className={style.ProductDetails}>
      <div className={style.top}>
        <p>Details</p>
        <div onClick={handleCartClick}>
          <img src="https://cdn-icons-png.flaticon.com/128/9248/9248474.png" alt="image"/>
        </div>
      </div>

    <img src={selectedProduct.images} />
    <p>${selectedProduct.price}</p>
      <p>${selectedProduct.title}</p>
      <p>${selectedProduct.description}</p>
    </div>
  );
}
export default ProductDetails;
