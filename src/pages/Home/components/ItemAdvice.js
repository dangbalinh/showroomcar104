/* eslint-disable jsx-a11y/img-redundant-alt */
import style from "./ItemAdvide.module.css";
import images from "../../../assets/image";

function ItemAdvice({data}) {
    return (
        <div className={style.container}>
            <div className={style.layout}>
                <div className={style.identity}>
                    <img
                        className={style.image}
                        src={data.image}
                        alt="image"
                    />
                    <div className={style.info}>
                        <div className={style.name}>{data.name}</div>
                        <div className={style.description}>
                            {data.owner}
                        </div>
                    </div>
                </div>
                <div className={style.advice}>
                    {data.description}
                </div>
                <div className={style.line}></div>
            </div>
        </div>
    );
}

export default ItemAdvice;
