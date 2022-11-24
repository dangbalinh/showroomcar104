import style from './Search.module.css'


function CarCard({data}) {
    return ( 
        <div className={style.carContainer}>
            <div className={style.carName}>{data.ten}</div>
            <img className={style.carImg} src={data.hinhanh} alt={data.ten} />
            <a className={style.carLink} href="/form">More Detail</a>
        </div>
     );
}

export default CarCard;