import styles from "./ReadNews.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import NewsSidebar from "../News/components/NewsSidebar";
import HandleNewsApi from "../../Apis/HandleNewsApi";

// scroll to top when navigate
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function ReadNews() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    HandleNewsApi.getNewsById(id).then(res => setDetail(res))
  }, [id]);

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
                  return <></>;
                })}
              </div>
            )}
          </section>
          <div class={styles.divider}></div>
          <NewsSidebar />
        </div>
      </div>
    </Wrapper>
  );
}

export default ReadNews;
