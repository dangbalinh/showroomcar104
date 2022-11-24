import style from './FormDetailProduct.module.css';
import images from '../../../assets/image';
import FormInput from './FormInput';
import { useState } from 'react';

function FormDetailProduct() {
    const [values,setValues] = useState({
        
    });
    const handleSubmit = (e) => {

    }
    return(
        <div className={style.formInputComment}>
            <p className={style.Comment}>Comment</p>
            <div className={style.carComment}>
                <img src={images.infoImg} alt="info client" />
                <p className={style.nameInfo}></p>
                <p className={style.commentInfo}></p>
            </div>
            <FormInput placeholder="Your comment"/>
            <FormInput placeholder="Name"/>
            <FormInput placeholder="Email"/>
        </div>

    );
}
export default FormDetailProduct;