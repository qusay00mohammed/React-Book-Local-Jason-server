import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { logInsert } from "./ReportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    try {
      // part 2
      // dispatch(type: "book/getBooks/pending", payload: undefined)
      const response = await fetch("http://localhost:3009/books"); // axios or pure js => fetch
      const data = await response.json();
      return data;
      // dispatch(type: "book/getBooks/fulfilled", payload: data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
      // dispatch(type: "book/getBooks/rejected", payload: error)
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (dataBook, thunkAPI) => {
    try {
      dataBook.username = thunkAPI.getState().auth.name;
      const response = await fetch("http://localhost:3009/books", {
        method: "POST",
        body: JSON.stringify(dataBook),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      thunkAPI.dispatch(logInsert({ name: "insertBook", status: "seccess" }));
      return data;
    } catch (error) {
      thunkAPI.dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    try {
      await fetch(`http://localhost:3009/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      // console.log(response);
      return item;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// part 1 <> getBooks: {pending, fulfilled, rejected}
// getBooks => createAsyncthunk => create 3 type of actions
// pending | fulfilled | rejected => => => createAction("book/getBooks/pending", (payload) => return payload)

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: false },
  extraReducers: {
    // part 3
    // getData
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // insertBook
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // deleteBook
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
