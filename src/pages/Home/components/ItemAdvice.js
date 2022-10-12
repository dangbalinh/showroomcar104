import style from "./ItemAdvide.module.css";
import images from "../../../assets/image";

function ItemAdvice() {
    return (
        <div className={style.container}>
            <div className={style.layout}>
                <div className={style.identity}>
                    <img
                        className={style.image}
                        src={images.infoImg}
                        alt="image"
                    />
                    <div className={style.info}>
                        <div className={style.name}>Brenda Smith</div>
                        <div className={style.description}>
                            Client, Honda owner
                        </div>
                    </div>
                </div>
                <div className={style.advice}>
                    You guys are really amazing! I have not yet seen a car
                    dealer who offers so much at such an affordable price. I
                    have found what I wanted in the catalog. Moreover, I have
                    sold my old car with their help.
                </div>
                <div className={style.line}></div>
            </div>
        </div>
    );
}

export default ItemAdvice;
