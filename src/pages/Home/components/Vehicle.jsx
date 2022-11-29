import style from "./Vehicle.module.css";
import ItemVehicle from "./ItemVehicle";
import images from "../../../assets/image";
import { useState } from "react";
import axios from "axios";
function Vehicle() {
    // const [car,setCar] = useState('toyota');
    const [car,setCar] = useState({name: "TOYOTA", branch: "toyota"});
    const contentVehicle = [];
    async function getItemCar(pro)
    {
        axios.get('https://showroomcar104.onrender.com/cars/637f96758e796c683c506c38')
        .then((response) => { setCar(response.data);
        }).catch(err => console.log(err))
        // array.forEach(element => {
            
        // });
    }


    const selectCar = (pro) => {
        getItemCar(pro);
    }
    const names = [
    {
        name:'TOYOTA',
        branch: 'toyota',
        img: images.logoToyota
        
        
    },
    {
        name:'BWM',
        branch: 'bwm',
        img: images.logoBWM
    },
    {
        name: 'FORD',
        branch: 'ford',
        img: images.logoFord
    },
    {
        name:'HONDA',
        branch: 'Honda',
        img: images.logoHonda
    },
    {
        name: 'HUYNHDAI',
        branch: 'huynhdai',
        img: images.logoHuynhdai
    },
    {
        name:'MERCEDEZ',
        branch: 'mercedez',
        img: images.logoMescedez
    },
    {
        name:'VINFAST',
        branch: 'vinfast',
        img: images.logoVinfast
    },
    {
        name:'KIA',
        branch: 'kia',
        img: images.logoKia
    },
]
    for( let i = 0; i <= 5; i++)
        contentVehicle.push(<ItemVehicle carName={car.name} carPrice={car.price} />);
    return (    
        <div className={style.VehicleContainer}>
            <ul>
                {names.map((car) => <li><a href="/" onClick={() => selectCar(car.branch)}><img src={car.img} alt="Toyota" className={style.imageCar}></img></a></li>)}     
            </ul>
            <div className={style.ItemVehicleCar}>
                {contentVehicle}
            </div>
        </div>
        
    );
}
export default Vehicle;