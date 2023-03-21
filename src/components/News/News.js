import React, { useEffect, useState } from "react";
import NewsItem from "./NewsCard";
import Spinner from "../Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capatalize(props.category)} - NewsJest`;
  
  const capatalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setArticle(json.articles);
      setLoading(false);
      setTotalResults(json.totalResults);
    });
    props.setProgress(100);
  };
  
  useEffect(() => {
    updateNews();
  }, []);

  const fetchData = async () => {
    // this.setState({ page: page + 1 });
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(article.concat(parsedData.articles));
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container  mx-auto my-3">
      <h1 className="text-center" style={{ margin: "40px 40px" }}>
        {`NewsJest - Top ${capatalize(props.category)} Headlines  `}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={article.length} //This is important field to render the next data
        next={fetchData}
        hasMore={article.length < totalResults}
        loader={<Spinner />}
        style={{ overflow: "hidden" }}
      >
        <div className="row my-4">
          {article.map((element, index) => {
            let { title, description, urlToImage, url, publishedAt, author, source } = element;
            return (
              <div className="col mb-2" key={index}>
                <NewsItem
                  className="col"
                  title={title ? title : ""}
                  description={description}
                  urlToImage={
                    urlToImage
                      ? urlToImage
                      : "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  }
                  url={url}
                  publishedAt={publishedAt}
                  author={author ? author : "Unknown"}
                  source={source.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
