import style from "./home.module.css";
import Product from "../../Componants/Product/product";
import ProductDetails from "../productDetails/productDetails";
import { useProduct } from "../../context.js/productContext";
import Cart from "../CartPage/cart";
import { Link } from "react-router-dom";

function Home() {
  const { searchProduct, setSearchProduct, selectedProduct } = useProduct();

  return (
    <>
      <div className={style.pageContainer}>
        <div className={style.leftContent}>
          <div className={style.input}>
            <h2>Home</h2>
            <input
              type="text"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              placeholder="Search a product"
            />
          </div>
          <div className={style.homeContainer}>
            <div className={style.productContainer}>
              <div className={style.productList}>
                <Product />
              </div>
            </div>
          </div>
        </div>

        <div className={style.rightContent}>
          {selectedProduct ? <ProductDetails /> : <Cart />}
        </div>
      </div>
    </>
  );
}

export default Home;
