import styles from "./ReadNews.module.css";
import images from "../../assets/image";
import SmallerCard from "../News/components/SmallerCard";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const dummyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim eget ex vitae vulputate. Nam placerat nunc sit amet ex egestas iaculis. Fusce ultricies turpis ut nibh tristique rutrum. Curabitur sollicitudin maximus nulla vitae efficitur. Donec mattis velit et rhoncus rhoncus. Ut suscipit porttitor nisl. Phasellus ac sem vel enim blandit convallis. Integer quis rutrum nisi, non fringilla urna. Quisque ut vulputate massa. Mauris vel ultricies odio. Aenean semper cursus velit ac finibus. In a libero varius, mattis justo a, ultricies elit. Nam massa tellus, iaculis id ex sed, viverra faucibus dolor. Curabitur congue nisl laoreet ultrices hendrerit. Donec imperdiet semper urna, id molestie tellus convallis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices metus in sagittis lacinia. Curabitur vel laoreet dolor. Nam nibh turpis, malesuada ac accumsan ac, tempor at odio. Donec maximus dignissim elit, eu vehicula augue posuere eget. Cras facilisis lorem vitae eros sollicitudin cursus. Aliquam condimentum porttitor turpis, quis tincidunt lorem finibus vitae.";
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
    text: dummyText,
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
    text: dummyText,
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
    text: dummyText,
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
    text: dummyText,
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
    text: dummyText,
  },
];

function ReadNews() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const { id } = useParams();

  //fake fetch data from api

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const LoadData = async (id) => {
      await sleep(2000);
      var result = newsss.find((news) => news.id == id);
      setData(result);
    };
    setData(null);
    LoadData(id);
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.newsSection}>
        <section className={styles.section}>
          {data == null ? (
            <div>loading</div>
          ) : (
            <div>
              <h3 className={styles.title}>{data.title}</h3>
              <p className={styles.date}>
                {data.date} - {data.author}
              </p>
              <img src={data.image} alt={data.title} className={styles.image} />
              <p className={styles.paragraphTitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className={styles.paragraphText}>{data.text}</p>
            </div>
          )}
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

export default ReadNews;
