import styles from "./ReadNews.module.css";
import "./ReadNews.css"
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import NewsSidebar from "../News/components/NewsSidebar";
import HandleNewsApi from "../../Apis/HandleNewsApi";
import parse from "html-react-parser"

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
            {detail &&
              <div>
                <h3 className={styles.title}>{detail.title}</h3>
                <p className={styles.date}>{detail.dateSource}</p>
                <div className={styles.detail}>{parse(detail.detail[0])}</div>
              </div>
            }
          </section>
          <div class={styles.divider}></div>
          <NewsSidebar />
        </div>
      </div>
    </Wrapper>
  );
}

export default ReadNews;
