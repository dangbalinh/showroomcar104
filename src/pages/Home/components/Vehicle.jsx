import style from "./Vehicle.module.css";
import ItemVehicle from "./ItemVehicle";
import images from "../../../assets/image";
import HandleApi from "../../../Apis/HandleApi";
import { useState, useEffect } from "react";
function Vehicle() {
    const [data,setData] = useState([]);
    const [branch,setBranch] = useState("Toyota");
    const contentVehicle = [];
    useEffect(() => {
        HandleApi.getCarByBrand(branch).then((res) => {
          setData(res.cars)
        })
        .catch(err => console.log(err));
      }, [branch])
    function selectBranchCar(x) {
        setBranch(x);
    }
    const names = [
    {
        branch: 'Toyota',
        img: images.logoToyota      
    },
    {
        branch: 'Bwm',
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
        branch: 'Huynhdai',
        img: images.logoHuynhdai
    },
    {
        branch: 'Mercedez',
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
    for( let i = 0; i <= 5; i++)
        contentVehicle.push(<ItemVehicle carName={data.name} carPrice={data.price} />);
    return (    
        <div className={style.VehicleContainer}>
            <ul>
                {names.map((car) => <li onClick={() => selectBranchCar(car.branch)}><img src={car.img} alt="Toyota" className={style.imageCar}></img></li>)}     
            </ul>
            <div className={style.ItemVehicleCar}>
                {contentVehicle}
            </div>
        </div>
        
    );
}
export default Vehicle;