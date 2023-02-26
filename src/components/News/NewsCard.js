import React, { Component } from "react";

export default class NewsCard extends Component {
  render() {
    let { title, description, urlToImage, url, publishedAt, author } = this.props;
    const time = publishedAt.slice(0, 10);
    return (
      <div className="my-3">
        <div className="card" style={{ width: "20rem" }}>
          <img className="card-img-top" src={urlToImage} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={url} className="btn btn-sm btn-dark">
              Read More
            </a>
            <p className="card-text">
              <small className="text-muted">By {author} on {time}</small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
