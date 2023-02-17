import React, { Component } from "react";
import NewsItem from "./NewsCard";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=541ca7c818c046b9aa0c3136fa8e2319`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          article: json.articles,
          loading: false,
        });
      });
  }

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=541ca7c818c046b9aa0c3136fa8e2319&page=${
      this.state.page + 1
    }`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          article: json.articles,
          page: this.state.page + 1,
        });
      });
  };

  handlePrevClick = () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=541ca7c818c046b9aa0c3136fa8e2319&page=${
      this.state.page - 1
    }`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          article: json.articles,
          page: this.state.page - 1,
        });
      });
  };

  render() {
    return (
      <div className="container  mx-auto my-3">
        <h1>NewsJest - Top Headlines</h1>
        <div className="row my-4">
          {this.state.article.map((element) => {
            let { title, description, urlToImage, url } = element;
            return (
              <div className="col mb-2" key={url}>
                <NewsItem
                  className="col"
                  title={title ? title : ""}
                  description={description}
                  urlToImage={
                    urlToImage
                      ? urlToImage
                      : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                  }
                  url={url}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            disabled={this.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-info mx-3"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
