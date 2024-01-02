import React from "react";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

export default function NewsItem(props) {
  let {
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    date,
    source,
    bookmarkNews,
  } = props;

  const handleBookmark = () => {
    bookmarkNews(title, description, imageUrl, newsUrl, author, date, source);
  };

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{!title ? "Unknown" : title} </h5>
          <p className="card-text">{!description ? "Unknown" : description}</p>
          <p className="card-text">
            <small className="text-muted">
              By :  {!author ? "Unknown" : author} , On : {new Date(date).toGMTString()}
            </small>
          </p>
          <div className="d-flex justify-content-start">
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-light"
              title="Read Full News"
            >
              Read More
            </a>
            <span className="btn btn-sm btn-light ms-2" title="Share">
              <WhatsappShareButton url={newsUrl}>
                <WhatsappIcon type="button" size={20} round={true} />
              </WhatsappShareButton>
            </span>
            <span
              className="btn btn-sm btn-light ms-2"
              onClick={handleBookmark}
              title="Add Bookmark"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3106/3106777.png"
                alt="Bookmark"
                style={{ height: "24px" }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
