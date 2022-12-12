import React, { useState, useEffect } from 'react'
import styles from "./NewsSidebar.module.css"
import SmallerCard from '../SmallerCard';
import { Link } from "react-router-dom";
import HandleNewsApi from '../../../../Apis/HandleNewsApi';


export default function NewsSidebar() {
    const [allData, setAllData] = useState();

    useEffect(() => {
        HandleNewsApi.getAllNews().then(res => setAllData(res.news))
    }, []);
    return (
        <aside className={styles.aside}>
            <h3>Tin nổi bật</h3>
            {allData?.slice(0, 5).map((news, index) => {
                return (
                    <Link
                        to={`/readnews/${news._id}`}
                        key={index}
                        className={styles.link}
                    >
                        <SmallerCard image={news.image} title={news.title} />
                    </Link>
                );
            })}
        </aside>
    )
}
