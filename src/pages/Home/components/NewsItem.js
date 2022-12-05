import style from "./NewsItem.module.css";
import { memo } from "react";

function NewsItem({data}) {
    return (
        <a href={`/readnews/${data._id}`} className={style.container}>
            <img
                src={data.image}
                alt="News img"
                className={style.img}
            />
            <div className={style.content}>
                <h1 className={style.heading}>{data.title.slice(0, 40)}...</h1>
                <div className={style.date}>{data.dateSource}</div>
                <p className={style.paragraph}>
                    {data.description.slice(0,140)}...
                </p>
            </div>
        </a>
    );
}

export default memo(NewsItem);
