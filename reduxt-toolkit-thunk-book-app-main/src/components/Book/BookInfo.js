import React, { Fragment } from "react";

const BookInfo = ({ info }) => {
  return (
    <Fragment>
      <h2>Book Details</h2>

      {info ? (
        <div>
          <br />
          <p className="fw-bold">
            <span className="bookInfo">Title: </span> {info.title}
          </p>
          <p className="fw-light">
            <span className="bookInfo">Description:</span> {info.description}
          </p>
          <p className="fst-italic">
            <span className="bookInfo">Price:</span> {info.price}
          </p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
