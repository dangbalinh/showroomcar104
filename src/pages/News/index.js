import styles from "./News.module.css";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stack, Pagination } from "@mui/material";
import NewsSidebar from "./components/NewsSidebar";
import HandleNewsApi from "../../Apis/HandleNewsApi";

function News() {
  const [dataLength, setDataLength] = useState();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    HandleNewsApi.getNewsByPageIndex(page - 1).then((res) => {
      setData(res.news);
      setDataLength(res.totalNews);
    });
  }, [page]);

  const handlePageChange = (e, p) => {
    setPage(p);
  };

  return (
    <div className={styles.container}>
      <h1>Tin tức</h1>
      <div className={styles.newsSection}>
        <section className={styles.section}>
          <div>

            {data?.map((news, index) => {
              return (
                <Link
                  to={`/readnews/${news._id}`}
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
          <div className={styles.pagination}>
            <Stack spacing={2}>
              <Pagination
                size="large"
                color="primary"
                count={Math.ceil(dataLength / 5)}
                showFirstButton
                showLastButton
                sx={{ margin: "32px 0 56px" }}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </section>
        <div class={styles.divider}></div>
        <NewsSidebar />
      </div>
    </div>
  );
}

export default News;
