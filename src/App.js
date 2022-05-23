import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { Helmet } from "react-helmet";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  });

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="moviename"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        ></input>
        <label>Review</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></input>
        <button onClick={submitReview}>Submit</button>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <Helmet>
          <script
            type="text/javascript"
            src="https://apis.google.com/js/platform.js"
            async
            defer
          />
        </Helmet>
        {movieReviewList.map((val) => {
          return (
            <div>
              <h1>
                Movie Name: {val.movieName} | Movie Review: {val.movieReview}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
