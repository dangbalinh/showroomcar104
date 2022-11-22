import style from "./ItemVehicle.module.css";
import images from "../../../assets/image";

function ItemVehicle() {
    return(
        <div>
            <p className={style.nameCar}>Vinfast e34</p>
            <p className={style.moreDetailCar}>from 3.000.000</p>
            {/* <img></img> */}

        </div>
    );
}
export default ItemVehicle;