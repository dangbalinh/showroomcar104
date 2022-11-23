import style from "./detailInformationCar.module.css";
import images from "../../../assets/image";
import moreDetailInformationCar from "./moreDetailInformationCar";
function detailInformationCar() {
    return(
        <div className="acb"> 
                <h1 className={style.CarName}>BWM X3 Sport 2022</h1>
                <p className={style.CarPrice}>Price</p>
                <p className={style.Price}>2.959.000</p>
                <moreDetailInformationCar/>
                <img src={images.bmwImg} alt="BWM X3 Sport 2022" />
                <button>BUY NOW</button>
        </div>
     
    );
}
export default detailInformationCar;