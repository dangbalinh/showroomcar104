import styles from "./Product.module.css"
import ItemProduct from "./ItemProduct";
import HandleApi from "../../Apis/HandleApi"
import { useEffect, useState } from "react";

function Product() {
  const [data, setData] = useState([]);

  useEffect(() => {
    HandleApi.getCarByBrand("HonDa1").then((res) => {
      console.log(res);
      setData(res.cars)
    })
    .catch(err => console.log(err));
  }, [])

console.log(data);
    return ( 
      <>
        <h1 className={styles.nameType}>Honda</h1>
        <div className={styles.containerLayout}>
              {data.map((item, index) => (
                <div  key={index}>
                  <ItemProduct data={item} />
                </div>
              ))}
        </div>
      </>
     );
}

export default Product;