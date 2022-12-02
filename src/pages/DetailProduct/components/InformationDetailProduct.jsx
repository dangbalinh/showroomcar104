import style from './InformationDetailProduct.module.css';
import images from '../../../assets/image';
import HandleApi from '../../../Apis/HandleApi';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useState } from 'react';

function InformationDetailProduct(pros) {
    const { productId } = useParams();
    const [data, setData] = useState([]);
    console.log(productId);
    useEffect(() => {
        HandleApi.getCarById(productId).then(res => setData(res));
        console.log(data);
    }, [])
    return (
        <div className={style.information}>
            <div className={style.information__heading}>
                <h1 className={style.information__heading__carName}>{data.ten}</h1>
                <hr className={style.line}/>
                <h2 className={style.information__heading__priceCar}>{data.gia + " VNĐ"}</h2>
                <hr className={style.line}/>
            </div>
            <div className={style.information__content}>
                <div className={style.information__content__info}>
                    <p className={style.information__content__carName}>{"Tên xe: " + data.ten}</p>
                    <p className={style.information__content__branch}>{"Thương hiệu: " + data.thuonghieu}</p>
                    <p className={style.information__content__origin}>{"Nguồn gốc: " + data.nguongoc}</p>
                    <p className={style.information__content__trademark}>{"Dung tích: " + data.dungtich}</p>
                    <p className={style.information__content__numberSeats}>{"Số chỗ: " + data.socho}</p>
                    <p className={style.information__content__engine}>{"Động cơ: " + data.dongco}</p>
                    <p className={style.information__content__gear}>{"Màu sắc: " + data.mausac}</p>
                    <p className={style.information__content__speedUp}>{"Vận tốc tối đa: " + data.vantoctoida}</p>
                    <p className={style.information__content__speedUp}>{"Công suất tối đa: " + data.congsuatcucdai}</p>
                    <p className={style.information__content__consumeEnergy}>{"Tiêu hao nhiên liệu (l/100km): " + data.tieuhaonhienlieu}</p>
                    <p className={style.information__content__size}>{"Kích thước (dài x rộng x cao): " + data.kichthuoc}</p>
                    <p className={style.information__content__baseLength}>{"Năm sản xuất: " + data.namsanxuat}</p>
                    <p className={style.information__content__equip}>{"Mô tả: " + data.mota}</p>
                </div>  
                <div className={style.informaton__content__img}>
                    <img src={data.hinhanh} alt="BMW M3" />
                </div>
            </div>
            <div className={style.buy}>
                <button>BUY NOW</button>
            </div>
        </div>
        
    );
}
export default InformationDetailProduct;