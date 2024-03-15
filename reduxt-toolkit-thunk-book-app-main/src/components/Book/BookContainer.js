import React, { Fragment, useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { getBooks, deleteBook } from "./../../store/BookSlice";
import { useDispatch, useSelector } from "react-redux";

import "./book.css";

const PostContainer = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, books } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBooks({ name: "qusay" }));
  }, [dispatch]);

  const getBook = (id) => {
    // const selectBook = books.filter((el) => el.id === id);
    const selectBook = books.find((el) => el.id === id);
    setSelectedBook((prev) => {
      return { ...prev, ...selectBook };
    });
  };

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBook={getBook}
          />
        </div>
        <div className="col side-line">
          <BookInfo info={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
