import styles from "./News.module.css";
import Card from "./components/Card";
import SmallerCard from "./components/SmallerCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dataNews from "./mockData.json";

function News() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dataNews);
  }, []);

  return (
    <div className={styles.container}>
      <h1>News</h1>
      <div className={styles.newsSection}>
        <section className={styles.section}>
          {data == null ? (
            <div>loading</div>
          ) : (
            <div>
              {data.map((news, index) => {
                return (
                  <Link
                    to={`/readnews/${news.index}`}
                    key={index}
                    className={styles.link}
                  >
                    <Card
                      image={news.image}
                      title={news.title}
                      date={news.dateSource}
                      description={news.description}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </section>
        <div class={styles.divider}></div>
        <aside className={styles.aside}>
          <h3>Most read</h3>
          {data == null ? (
            <div>loading</div>
          ) : (
            <div>
              {data.slice(0, 5).map((news, index) => {
                return (
                  <Link
                    to={`/readnews/${news.index}`}
                    key={index}
                    className={styles.link}
                  >
                    <SmallerCard image={news.image} title={news.title} />
                  </Link>
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default News;
