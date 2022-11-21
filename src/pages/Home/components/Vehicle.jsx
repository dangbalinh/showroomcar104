import style from "./Vehicle.module.css";
import images from "../../../assets/image";

function Vehicle() {
    return (
        <div className={style.VehicleContainer}>
            <ul>
               <li><a href="#">TOYOTA</a></li>
               <li><a href="#">BWM</a></li>
               <li><a href="#">FORD</a></li>
               <li><a href="#">HONDA</a></li>
               <li><a href="#">HUYNHDAI</a></li>
               <li><a href="#">MERCEDEZ</a></li>
               <li><a href="#">VINFAST</a></li> 
               <li><a href="#">KIA</a></li>
            </ul>
        </div>
    );
}
export default Vehicle;