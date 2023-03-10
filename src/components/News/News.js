import React, { Component } from "react";
import NewsItem from "./NewsCard";
import Spinner from "../Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capatalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capatalize(this.props.category)} - NewsJest`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          article: json.articles,
          loading: false,
          totalResults: json.totalResults,
        });
      });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container  mx-auto my-3">
        <h1 className="text-center" style={{ margin: "40px 40px" }}>
          {`NewsJest - Top ${this.capatalize(this.props.category)} Headlines  `}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.article.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.article.length < this.state.totalResults}
          loader={<Spinner />}
          style={{ overflow: "hidden" }}
        >
          <div className="row my-4">
            {this.state.article.map((element, index) => {
              let {
                title,
                description,
                urlToImage,
                url,
                publishedAt,
                author,
                source,
              } = element;
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
  }
}
