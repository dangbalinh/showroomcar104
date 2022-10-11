import style from './ItemCar.module.css'
import images from '../../assets/image';

function ItemCar({name}) {
    return ( 
        <div className={style.carContainer}>
            <div className={style.carName}>{name}</div>
            <img className={style.carImg} src={images.bmwImg} alt="BMW Car" />
            <a className={style.carLink} href="/form">Buy now</a>
        </div>
     );
}

export default ItemCar;