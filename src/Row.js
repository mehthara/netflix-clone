import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //A snippet of code which runs based on a specific condition/variable. so in this: when the row is loaded, we want this useEffect code to run.
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL); //await tells the function to wait until a response is received from the function and only then continue to next line.
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    //if square bracket [] at the end is left blank, then this code will run only once and never again.
    //if we gave [movies], it will run once when the row loads and every single time the movies changes. we call the [] a dependency.
  }, [fetchURL]);
  //we passed fetchUrl in [], because fetchUrl is another variable outside the block passed into this function. so we need to alert the function whenever fetchUrl changes

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || movie?.title || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         urlParams.get("v");
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=f60a6a01edcd343b6812d46a0f0d398a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/**several row_posters here */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
