import style from "./ItemVehicle.module.css";
import images from "../../../assets/image";

function ItemVehicle() {
    return(
        <div className={style.ItemVehicleContainer}>
            <p className={style.nameCar}>Vinfast e34</p>
            <p className={style.moreDetailCar}>from 3.000.000</p>
            <img src={images.bmwImg} alt="BMW car" width={250}/>
            <button className={style.buttonShowInformation}>Discover More</button>

        </div>
    );
}
export default ItemVehicle;