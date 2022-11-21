import styles from "./News.module.css";
import images from "../../assets/image";
import Card from "./components/Card";
import SmallerCard from "./components/SmallerCard";

const newsss = [
  {
    title: "New car for Toyota 2022!",
    image: images.newsImg,
    date: "31-8-2022",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "5",
  },
  {
    title: "New car for Toyota 2022!",
    image: images.newsImg,
    date: "31-8-2022",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "4",
  },
  {
    title: "New car for Toyota 2022!",
    image: images.newsImg,
    date: "31-8-2022",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "3",
  },
  {
    title: "New car for Toyota 2022!",
    image: images.newsImg,
    date: "31-8-2022",
    description:
      "Hiện tại ở BMW tại Hà Tĩnh chưa có Showroom chính thức của BMW. Do vậy mọi nhu cầu về Trải nghiệm lái thử, hoặc mua xe quý khách hàng vui lòng liên hệ BMW Việt...",
    readCount: "2",
  },
  {
    title: "New car for Toyota 2022!",
    image: images.newsImg,
    date: "31-8-2022",
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
              <Card
                key={index}
                image={news.image}
                title={news.title}
                date={news.date}
                description={news.description}
              />
            );
          })}
        </section>
        <div class={styles.divider}></div>
        <aside className={styles.aside}>
          <h3>Most read</h3>
          {newsss.map((news, index) => {
            return (
              <SmallerCard key={index} image={news.image} title={news.title} />
            );
          })}
        </aside>
      </div>
    </div>
  );
}

export default News;
