import React, { Component } from "react";
import NewsItem from "./NewsCard";
import Spinner from "../Spinner";
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

  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=541ca7c818c046b9aa0c3136fa8e2319&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          article: json.articles,
          loading: false,
          totalResults: json.totalResults,
        });
      });
  }
  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
      //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${
      //     this.props.category
      //   }&apiKey=541ca7c818c046b9aa0c3136fa8e2319&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      //   this.setState({ loading: true });

      //   fetch(url)
      //     .then((res) => res.json())
      //     .then((json) => {
      //       this.setState({
      //         loading: false,
      //         article: json.articles,
      //         page: this.state.page + 1,
      //       });
      //     });
      this.setState({ page: this.state.page + 1 });
      this.updateNews();
    }
  };

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${
    //   this.props.category
    // }&apiKey=541ca7c818c046b9aa0c3136fa8e2319&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.setState({
    //       loading: false,
    //       article: json.articles,
    //       page: this.state.page - 1,
    //     });
    //   });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container  mx-auto my-3">
        <h1 className="text-center" style={{ margin: "40px 40px" }}>
          NewsJest - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row my-4">
          {!this.state.loading &&
            this.state.article.map((element) => {
              let { title, description, urlToImage, url, publishedAt, author, source } = element;
              return (
                <div className="col mb-2" key={url}>
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
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark mx-3"
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)}
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
