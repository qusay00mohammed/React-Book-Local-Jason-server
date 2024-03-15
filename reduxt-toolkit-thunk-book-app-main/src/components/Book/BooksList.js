import React from "react";

const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  deleteBook,
  dispatch,
  getBook,
}) => {
  const list =
    books.length > 0
      ? books.map((item) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={item.id}
          >
            <div>{item.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => getBook(item.id)}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(item))
                    .unwrap()
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "There is not book available!";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "Loding..." : <ul className="list-group">{list}</ul>}
    </div>
  );
};

export default BooksList;
