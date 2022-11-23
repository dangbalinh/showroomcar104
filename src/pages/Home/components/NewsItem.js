import style from "./NewsItem.module.css";
import images from "../../../assets/image";

function NewsItem() {
    return (
        <div className={style.container}>
            <img
                src={images.newsItemImg}
                alt="News img"
                className={style.img}
            />
            <div className={style.content}>
                <h1 className={style.heading}>NEWS 1</h1>
                <div className={style.date}>12-09-2022</div>
                <p className={style.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore.
                </p>
            </div>
        </div>
    );
}

export default NewsItem;
