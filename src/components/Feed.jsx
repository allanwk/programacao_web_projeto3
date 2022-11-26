/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint jsx-a11y/alt-text: 0 */

import { useEffect, useState } from "react";

export default function Feed({ query, reloadNewsIdx, loading, setLoading }) {
  const [news, setNews] = useState([]);

  const truncate = (str, max, suffix) =>
    str.length < max
      ? str
      : `${str.substr(
          0,
          str.substr(0, max - suffix.length).lastIndexOf(" ")
        )}${suffix}`;

  useEffect(() => {
    let url;
    if (!query) {
      url = `https://api.currentsapi.services/v1/search?language=en&apiKey=${process.env.REACT_APP_API_KEY}&category=technology,programming,science,business`;
    } else {
      url = `https://api.currentsapi.services/v1/search?language=en&apiKey=${process.env.REACT_APP_API_KEY}&keywords=${query}&limit=20`;
    }
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filteredNews = data.news.filter(
          (n) =>
            n.image !== "None" &&
            n.title.length > 10 &&
            n.description.length > 10
        );
        setNews(filteredNews);
        setLoading(false);
      });
  }, [reloadNewsIdx]);

  return (
    <section id="stories">
      <div className="main-stories">
        <div className="main-left">
          {news.length > 0 ? (
            <a href={news[0].url}>
              <img src={news[0].image} />
              <div className="text-container">
                <h1>{truncate(news[0].title, 50, "...")}</h1>
                <h2>{truncate(news[0].description, 100, "...")}</h2>
                <p className="author">{news[0].author}</p>
              </div>
            </a>
          ) : null}
        </div>

        {news.length > 1 ? (
          <div className="main-right">
            {news.slice(1, 4).map((n) => (
              <a href={n.url} className="wrapper-link" key={n.id}>
                <div className="text">
                  <h1 className="headline">{truncate(n.title, 50, "...")}</h1>
                  <h2 className="subtitle">
                    {truncate(n.description, 80, "...")}
                  </h2>
                  <p className="author">{n.author}</p>
                </div>
                <div className="img-container">
                  <img src={n.image} />
                </div>
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {news.length > 4 ? (
        <div className="latest-stories">
          <h2>Latest Stories</h2>
          <div className="latest-stories-grid">
            {news.slice(4, 10).map((n) => (
              <a href={n.url} className="card wrapper-link" key={n.id}>
                <img src={n.image} />
                <p className="tag">{n.category}</p>
                <h1 className="headline">{truncate(n.title, 50, "...")}</h1>
                <p className="author light">{n.author}</p>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {news.length > 10 ? (
        <div className="more-stories">
          <h2>More Stories</h2>
          <div className="more-stories-grid">
            {news.slice(10, 16).map((n) => (
              <a className="sideways-card wrapper-link" href={n.url} key={n.id}>
                <img src={n.image} />
                <div className="side-text">
                  <p className="tag">{n.category}</p>
                  <h1 className="headline">{truncate(n.title, 50, "...")}</h1>
                  <p className="author light">{n.author}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
