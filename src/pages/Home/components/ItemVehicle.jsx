import style from "./ItemVehicle.module.css";
import images from "../../../assets/image";
import { useState } from "react";

function ItemVehicle(pros) {
    const {carName,carInfo} = pros;
    return(
        <div className={style.itemCarContainer}>
            <p className={style.carName}>{carName}</p>
            <p className={style.carInfo}>{carInfo}</p>
            <img src={images.bmwImg} alt="BMW car" width={250}/>
            <button className={style.buttonDiscoverMore}>Discover More</button>
        </div>
    );
}
export default ItemVehicle;