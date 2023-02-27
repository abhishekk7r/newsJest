import React, { Component } from "react";

export default class NewsCard extends Component {
  constructor(){
      super();
      this.state = {
        colorMode : "danger"
      };
    }

    render() {
    let { title, description, urlToImage, url, publishedAt, author, source } = this.props;
    const time = publishedAt;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "20rem" }}>
          <span
            className={`position-absolute top-0 translate-middle badge rounded-pill bg-${this.state.colorMode}`}
            style={{ marginLeft: "241px" }}
          >
            {source}
            <span className="visually-hidden"></span>
          </span>
          <img className="card-img-top" src={urlToImage} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={url} className="btn btn-sm btn-dark">
              Read More
            </a>
            <p className="card-text">
              <small className="text-muted">
                By {author} {new Date(time).toGMTString().slice(0, 26)}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
