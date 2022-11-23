import styles from "./ReadNews.module.css";
import SmallerCard from "../News/components/SmallerCard";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import dataNews from "./mockData.json";
import { useLayoutEffect } from "react";

// scroll to top when navigate
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function ReadNews() {
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setData(dataNews);
    var result = dataNews.find((d) => d.index == id);
    setDetail(result);
  }, [location.pathname, id]);

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.newsSection}>
          <section className={styles.section}>
            {detail == null ? (
              <div>loading</div>
            ) : (
              <div>
                <h3 className={styles.title}>{detail.title}</h3>
                <p className={styles.date}>{detail.dateSource}</p>
                {detail.detail.map((d, index) => {
                  if (d.type === "img") {
                    return (
                      <img
                        key={d.index}
                        className={styles.image}
                        src={d.content}
                        alt={index}
                      />
                    );
                  } else if (d.type === "p") {
                    return (
                      <p key={d.index} className={styles.paragraphText}>
                        {d.content}
                      </p>
                    );
                  } else if (d.type === "h2") {
                    return (
                      <h2 key={d.index} className={styles.paragraphTitle}>
                        {d.content}
                      </h2>
                    );
                  }
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
    </Wrapper>
  );
}

export default ReadNews;
