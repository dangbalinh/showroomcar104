import style from "./ItemVehicle.module.css";
import {Routes , Route , Link  } from 'react-router-dom'
import detailproduct from "../../DetailProduct";
import images from "../../../assets/image";
import { useState } from "react";

function ItemVehicle(pros) {
    const {carName,carInfo} = pros;
    <Routes>
        <Route path="/detailproduct" element={<detailproduct/>} preventScrollReset={false}/>
    </Routes>
    return(
        <div className={style.itemCarContainer}>
            <p className={style.carName}>{carName}</p>
            <p className={style.carInfo}>{carInfo}</p>
            <img src={images.bmwImg} alt="BMW car" />
            <Link to="/detailproduct">
                <button className={style.buttonDiscoverMore}>Discover More</button>
            </Link>
            
        </div>
    );
}
export default ItemVehicle;