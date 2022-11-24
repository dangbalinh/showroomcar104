import styles from "./ItemProduct.module.css"
function ItemProduct(props){
    return(
        <>
            <div className={styles.listProducts}>
                <div className={styles.itemProduct}>
                    <h3 className={styles.itemProduct__Title}>Mercedes-Benz E Class</h3>
                    <p className={styles.itemProduct__Price}>Giá: 3.000.000.000 đ</p>
                    <img className={styles.productImg}
                        src="https://firebasestorage.googleapis.com/v0/b/showroomcar-6961d.appspot.com/o/Mer%2FMercedes%20C300%20AMG%202022.png?alt=media&token=0660fb7e-a6e4-4b5b-ab8e-d072cb293f2a"
                        alt=""
                    />
                    <a className={styles.linkDiscover} href="/contact">Details</a>
                </div>
            </div>
        </>
    );
}

export default ItemProduct;