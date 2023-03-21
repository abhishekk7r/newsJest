import React from "react";

const NewsCard = (props) => {
  let { title, description, urlToImage, url, publishedAt, author, source } = props;
  const time = publishedAt;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "20rem" }}>
        <span className={`position-absolute top-0 translate-middle badge rounded-pill`} style={{ marginLeft: "0px" }}>
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
};

export default NewsCard;
