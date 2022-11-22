import style from "./Vehicle.module.css";
import ItemVehicle from "./ItemVehicle";
import images from "../../../assets/image";


function Vehicle() {
    return (
        <div className={style.VehicleContainer}>
            <ul>
               <li><a href="#toyota">TOYOTA</a></li>
               <li><a href="#bmw">BWM</a></li>
               <li><a href="#ford">FORD</a></li>
               <li><a href="#honda">HONDA</a></li>
               <li><a href="#huyndai">HUYNHDAI</a></li>
               <li><a href="#mercedez">MERCEDEZ</a></li>
               <li><a href="#vinfast">VINFAST</a></li> 
               <li><a href="#kia">KIA</a></li>
            </ul>
            <div className={style.ItemVehicleCar}>
                <ItemVehicle />
                <ItemVehicle/>
                <ItemVehicle/>
                <ItemVehicle/>
                <ItemVehicle/>
                <ItemVehicle/>
            </div>
        </div>
        
    );
}
export default Vehicle;