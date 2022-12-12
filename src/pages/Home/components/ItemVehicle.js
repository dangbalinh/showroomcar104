import style from "./ItemVehicle.module.css";
import {Link } from 'react-router-dom'
function ItemVehicle({data}) {
    return(
        <div className={style.itemCarContainer}>
            <p className={style.carName}>{data.ten}</p>
            <p className={style.carInfo}>{data.gia.toLocaleString() + " VNĐ"}</p>
            <img src={data.hinhanh} alt="BMW car" width={300} height={170}/>
            <Link to={`/detailproduct/${data._id}`}>
                <button className={style.buttonDiscoverMore}>Chi tiết</button>
            </Link>
            
        </div>
    );
}
export default ItemVehicle;