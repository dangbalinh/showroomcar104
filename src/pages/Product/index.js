import styles from "./Product.module.css"
import ItemProduct from "./ItemProduct";
import HandleApi from "../../Apis/HandleApi"
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function Product() {
  const [data, setData] = useState([]);
  const { carBrand } = useParams();
 
  
console.log(carBrand);

  useEffect(() => {
    HandleApi.getCarByBrand(carBrand)
    .then((res) => {
      console.log(res);
      setData(res.cars)
    })
    .catch(err => console.log(err));
  }, [])
  
    return ( 
      <div className={styles.productContainer} >
        <h1 className={styles.nameType}>{carBrand.toUpperCase()}</h1>
        <div className={styles.containerLayout}>
              {data.map((item, index) => (
                <div  key={index}>
                  <ItemProduct data={item} />
                </div>
              ))}
        </div>
      </div>
     );
}

export default Product;