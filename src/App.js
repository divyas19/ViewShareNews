import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import BookmarkNews from "./components/BookmarkNews";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [bookmarkArray, setBookmarkArray] = useState(() => {
    const data = localStorage.getItem("arrayData");
    if (data === null) return [];

    return JSON.parse(data);
  });

  const bookmarkNews = (
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    date,
    source
  ) => {
    const id = new Date();
    const newBookmarkArray = [
      ...bookmarkArray,
      { id, title, description, imageUrl, newsUrl, author, date, source },
    ];
    setBookmarkArray(newBookmarkArray);
    localStorage.setItem("arrayData", JSON.stringify(newBookmarkArray));
    alert("Added Bookmark!!!");
  };

  const onDelete = (id) => {
    const newBookmarkArray = bookmarkArray.filter((value) => value.id !== id);
    setBookmarkArray(newBookmarkArray);
    localStorage.setItem("arrayData", JSON.stringify(newBookmarkArray));
    console.log("Delete called:");
  };

  const handleDeleteAll = () => {
    setBookmarkArray([]);
    localStorage.setItem("arrayData", JSON.stringify([]));
  };

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
                bookmarkNews={bookmarkNews}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                country="in"
                category="business"
                bookmarkNews={bookmarkNews}
              />
            }
          />

          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
                bookmarkNews={bookmarkNews}
              />
            }
          />

          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
                bookmarkNews={bookmarkNews}
              />
            }
          />

          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
                bookmarkNews={bookmarkNews}
              />
            }
          />

          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                country="in"
                category="science"
                bookmarkNews={bookmarkNews}
              />
            }
          />

          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
                bookmarkNews={bookmarkNews}
              />
            }
          />

          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                country="in"
                category="technology"
                bookmarkNews={bookmarkNews}
              />
            }
          />

          <Route
            exact
            path="/bookmark"
            element={
              <BookmarkNews
                onDelete={onDelete}
                handleDeleteAll={handleDeleteAll}
                bookmarkArray={bookmarkArray}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
