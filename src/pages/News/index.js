import styles from "./News.module.css";
import images from "../../assets/image";
import Card from "./components/Card";
import SmallerCard from "./components/SmallerCard";
import { Link } from "react-router-dom";

const newsss = [
  {
    id: 1,
    title: "New car for Toyota 2022! 1",
    image: images.newsImg,
    date: "31-8-2022",
    author: "Person A",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "5",
  },
  {
    id: 2,
    title: "New car for Toyota 2022! 2",
    image: images.newsImg,
    date: "31-8-2022",
    author: "Person A",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "4",
  },
  {
    id: 3,
    title: "New car for Toyota 2022! 3",
    image: images.newsImg,
    date: "31-8-2022",
    author: "Person A",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "3",
  },
  {
    id: 4,
    title: "New car for Toyota 2022! 4",
    image: images.newsImg,
    date: "31-8-2022",
    author: "Person A",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "2",
  },
  {
    id: 5,
    title: "New car for Toyota 2022! 5",
    image: images.newsImg,
    date: "31-8-2022",
    author: "Person A",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "1",
  },
];

function News() {
  return (
    <div className={styles.container}>
      <h1>News</h1>
      <div className={styles.newsSection}>
        <section className={styles.section}>
          {newsss.map((news, index) => {
            return (
              <Link
                to={`/readnews/${news.id}`}
                key={index}
                className={styles.link}
              >
                <Card
                  image={news.image}
                  title={news.title}
                  date={news.date}
                  description={news.description}
                />
              </Link>
            );
          })}
        </section>
        <div class={styles.divider}></div>
        <aside className={styles.aside}>
          <h3>Most read</h3>
          {newsss.map((news, index) => {
            return (
              <Link
                to={`/readnews/${news.id}`}
                key={index}
                className={styles.link}
              >
                <SmallerCard image={news.image} title={news.title} />
              </Link>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

export default News;
