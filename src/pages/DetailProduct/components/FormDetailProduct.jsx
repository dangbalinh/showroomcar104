import style from './FormDetailProduct.module.css';
import images from '../../../assets/image';

function FormDetailProduct() {
    return(
        <div className={style.formInputComment}>
            <p className={style.Comment}>Comment</p>
            <div className={style.carComment}>
                <img src={images.infoImg} alt="info client" />
                <p className={style.nameInfo}>PERSON A</p>
                <p className={style.commentInfo}>This car is great</p>
            </div>
            <div className={style.inputInfo}>
                <p className={style.titleComment}>Your comment</p>
                <div className={style.inputItem}>
                    <input placeholder="Your comment" className={style.comment}/>
                    <input placeholder="Name" className={style.name}/>
                    <input placeholder="Email" className={style.email}/>
                </div>
                <button className={style.post}>Post</button>
            </div>  
        </div>

    );
}
export default FormDetailProduct;