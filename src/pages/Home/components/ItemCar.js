import style from "./ItemCar.module.css";
import images from "../../../assets/image";

function ItemCar({ data }) {
    console.log(data);
    return (
        <div className={style.carContainer}>
            <div className={style.carName}>{data.ten}</div>
            <img className={style.carImg} src={data.hinhanh} alt={data.ten} />
            <a className={style.carLink} href="/form">
                Buy now
            </a>
        </div>
    );
}

export default ItemCar;
