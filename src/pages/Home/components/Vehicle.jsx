import style from "./Vehicle.module.css";
import ItemVehicle from "./ItemVehicle";
import images from "../../../assets/image";
import { useState } from "react";

function Vehicle() {
    return (
        <div className={style.VehicleContainer}>
            <nav>
                <ul>
                    <li>
                        <a href="#toyota">TOYOTA</a>
                    </li>
                    <li>
                        <a href="#bmw">BWM</a>
                    </li>
                    <li>
                        <a href="#ford">FORD</a>
                    </li>
                    <li>
                        <a href="#honda">HONDA</a>
                    </li>
                    <li>
                        <a href="#huyndai">HUYNHDAI</a>
                    </li>
                    <li>
                        <a href="#mercedez">MERCEDEZ</a></li>
                    <li>
                        <a href="#vinfast">VINFAST</a></li> 
                    <li>
                        <a href="#kia">KIA</a>
                    </li>
                </ul>
            </nav>
            
            <div className={style.ItemVehicleCar}>
                <ItemVehicle carName="Toyota e4" carInfo="from 3000" />
                <ItemVehicle carName="Toyota e4" carInfo="from 3000"/>
                <ItemVehicle carName="Toyota e4" carInfo="from 3000"/>
                <ItemVehicle carName="Toyota e4" carInfo="from 3000"/>
                <ItemVehicle carName="Toyota e4" carInfo="from 3000"/>
                <ItemVehicle carName="Toyota e4" carInfo="from 3000"/>
            </div>
        </div>
        
    );
}
export default Vehicle;