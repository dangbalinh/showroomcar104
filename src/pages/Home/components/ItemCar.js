import style from './ItemCar.module.css'
import images from '../../../assets/image';

function ItemCar({data}) {
    console.log(data);
    return ( 
        <div className={style.carContainer}>
            <div className={style.carName}>{data.name}</div>
            <img className={style.carImg} src={data.image} alt={data.name} />
            <a className={style.carLink} href="/form">Buy now</a>
        </div>
     );
}

export default ItemCar;