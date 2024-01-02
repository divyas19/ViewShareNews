import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const NewsImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5OZtQGd6xj6xc1eNBf7n06PWOC1fOvrTgg&usqp=CAU";
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async () => {
    try {
      props.setProgress(10);
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error(`Failed to fetch data. Status: ${data.status}`);
      }

      props.setProgress(30);
      let parsedData = await data.json();

      if (
        !parsedData ||
        !parsedData.articles ||
        !Array.isArray(parsedData.articles)
      ) {
        throw new Error("Invalid data format in the API response");
      }

      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreNews = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      setPage(nextPage);

      let data = await fetch(url);

      if (!data.ok) {
        throw new Error(`Failed to fetch more data. Status: ${data.status}`);
      }

      let parsedData = await data.json();

      if (
        !parsedData ||
        !parsedData.articles ||
        !Array.isArray(parsedData.articles)
      ) {
        throw new Error("Invalid data format in the API response");
      }

      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more news:", error.message);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - ViewShareNews`;
    fetchNews();
  }, []);

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreNews}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={!element.url ? "" : element.url}>
                  <NewsItem
                    title={
                      !element.title ? "No title available:" : element.title
                    }
                    description={
                      !element.description
                        ? "No description available:"
                        : element.description
                    }
                    imageUrl={
                      !element.urlToImage ? NewsImageUrl : element.urlToImage
                    }
                    newsUrl={!element.url ? "No url available:" : element.url}
                    author={
                      !element.author ? " : No author available" : element.author
                    }
                    date={
                      !element.publishedAt
                        ? " : No date available"
                        : element.publishedAt
                    }
                    source={
                      !element.source.name
                        ? "No source available:"
                        : element.source.name
                    }
                    bookmarkNews={props.bookmarkNews}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
