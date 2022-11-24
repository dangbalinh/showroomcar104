import styles from "./Product.module.css"
import ItemProduct from "./ItemProduct";

function Product() {
    return ( 
      <>
        <h1 className={styles.nameType}>MERCEDES</h1>
        <div className={styles.containerLayout}>
              <ItemProduct/>
              <ItemProduct/>
              <ItemProduct/>
              <ItemProduct/>
              <ItemProduct/>
              <ItemProduct/>
              <ItemProduct/>
              <ItemProduct/>
              <ItemProduct/>
              
        </div>
      </>
     );
}

export default Product;