import style from "./Vehicle.module.css";
import ItemVehicle from "./ItemVehicle";
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
        branch: 'toyota'
    },
    {
        name:'BWM',
        branch: 'bwm'
    },
    {
        name: 'FORD',
        branch: 'ford'
    },
    {
        name:'HONDA',
        branch: 'Honda'
    },
    {
        name: 'HUYNHDAI',
        branch: 'huynhdai'
    },
    {
        name:'MERCEDEZ',
        branch: 'mercedez'
    },
    {
        name:'VINFAST',
        branch: 'vinfast'
    },
    {
        name:'KIA',
        branch: 'kia'
    },
]
    for( let i = 0; i <= 5; i++)
        contentVehicle.push(<ItemVehicle carName={car.name} carPrice={car.price} />);
    return (    
        <div className={style.VehicleContainer}>
            <ul>
                {names.map((car) => <li><a href="/" onClick={() => selectCar(car.branch)}>{car.name}</a></li>)}     
            </ul>
            <div className={style.ItemVehicleCar}>
                {contentVehicle}
            </div>
        </div>
        
    );
}
export default Vehicle;