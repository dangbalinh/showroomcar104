import style from "./Vehicle.module.css";
import ItemVehicle from "./ItemVehicle";
import images from "../../../assets/image";
import HandleApi from "../../../Apis/HandleApi";
import { useState, useEffect, memo } from "react";
function Vehicle() {
    const [data,setData] = useState([]);
    const [branch,setBranch] = useState("Toyota");
    useEffect(() => {
        HandleApi.getSixCarsByBranch(branch).then((res) => {
          setData(res.cars)
        })
        .catch(err => console.log(err));
      }, [branch])
    function selectBranchCar(x) {
        console.log(x);
        setBranch(x);
    }
    const names = [
    {
        branch: 'Toyota',
        img: images.logoToyota      
    },
    {
        branch: 'BMW',
        img: images.logoBWM
    },
    {
        branch: 'Ford',
        img: images.logoFord
    },
    {
        branch: 'Honda',
        img: images.logoHonda
    },
    {
        branch: 'Hyundai',
        img: images.logoHuynhdai
    },
    {
        branch: 'Mercedes',
        img: images.logoMescedez
    },
    {
        branch: 'Vinfast',
        img: images.logoVinfast
    },
    {
        branch: 'Kia',
        img: images.logoKia
    },
]
    return (    
        <div className={style.VehicleContainer}>
            <ul>
                {names.map((car) => <li onClick={() => selectBranchCar(car.branch)}><img src={car.img} alt="" className={style.imageCar}></img></li>)}     
            </ul>
            <div className={style.ItemVehicleCar}>
                {data.map((item, index) => (
                <div  key={index}>
                  <ItemVehicle data={item} />
                </div>
                ))}
            </div>
        </div>
        
    );
}
export default memo(Vehicle);