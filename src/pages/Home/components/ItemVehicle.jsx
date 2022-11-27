import style from "./ItemVehicle.module.css";
import {Link } from 'react-router-dom'
import images from "../../../assets/image";
function ItemVehicle(pros) {
    const {carName,carPrice,carImage} = pros;
    return(
        <div className={style.itemCarContainer}>
            <p className={style.carName}>{carName}</p>
            <p className={style.carInfo}>{carPrice}</p>
            <img src={images.bmwImg} alt="BMW car" width={250}/>
            <Link to="/detailproduct">
                <button className={style.buttonDiscoverMore}>Discover More</button>
            </Link>
            
        </div>
    );
}
export default ItemVehicle;