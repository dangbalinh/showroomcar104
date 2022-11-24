import style from './InformationDetailProduct.module.css';
import images from '../../../assets/image';
function InformationDetailProduct(pros) {
    
    return (
        <div className={style.information}>
            <div className={style.information__heading}>
                <h1 className={style.information__heading__carName}>BWM X3</h1>
                <hr className={style.line}/>
                <h2 className={style.information__heading__priceCar}>2.959.000</h2>
                <hr className={style.line}/>
            </div>
            <div className={style.information__content}>
                <div className={style.information__content__info}>
                    <p className={style.information__content__carName}>Tên xe: BWM X M Sport 2022</p>
                    <p className={style.information__content__branch}>Thương hiệu: BWM</p>
                    <p className={style.information__content__origin}>UNITED STATES OF AMERICA</p>
                    <p className={style.information__content__trademark}>Kiểu dáng: SUV</p>
                    <p className={style.information__content__numberSeats}>Số chô: 5</p>
                    <p className={style.information__content__engine}>Động cơ: "B48252hp Xăng 2.0L Twin Power Turbo</p>
                    <p className={style.information__content__gear}>Hộp số: Tự động 8 cấp Steptronic</p>
                    <p className={style.information__content__speedUp}>Tăng tốc(0-100): 6.4s</p>
                    <p className={style.information__content__consumeEnergy}>Tiêu thụ nhiên liệu trung bình(L/100): 7.4L</p>
                    <p className={style.information__content__size}>Kích thước(Dài/Rộng/Cao): 4708-1891-1676</p>
                    <p className={style.information__content__baseLength}>Chiều dài cơ sở: 2864(mm)</p>
                    <p className={style.information__content__equip}>Trang bị: "M-Sport" thể thao</p>
                </div>  
                <div className={style.informaton__content__img}>
                    <img src={images.bmwImg} alt="BMW M3" />
                </div>
            </div>
            <div className={style.buy}>
                <button>BUY NOW</button>
            </div>
        </div>
        
    );
}
export default InformationDetailProduct;