import { useState, useEffect } from "react";
import Header from "./components/header";
import Card from "./components/card";
import "./app.css";
import { Pagination, Skeleton, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function App() {
  const [returnedMovies, setReturnedMovies] = useState([]);
  const [dark, setDark] = useState(true);
  const [mount, setMount] = useState(false);

  const paginationStyles = {
    borderRadius: "12px",
    padding: ".4rem",
    display: "flex",
    justifyContent: "center",
    margin: "1rem"
  };

  const paginationContainerStyles = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "-2rem",
    paddingBottom: "2rem"
  };

  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: dark ? "#1F2937" : "white"
      }
    }
  }));

  const classes = useStyles();
  function goBack() {
    setMount(!mount);
  }

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=085ef2d4b31c38c944f304be6504cc16&language=en-US&page=1";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setReturnedMovies(data.results));
  }, [mount]);

  window.onload = (e) => {
    setMount(!true);
  };

  const getPageData = (pageNumber) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=085ef2d4b31c38c944f304be6504cc16&language=en-US&page=${pageNumber}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setReturnedMovies(data.results));
  };

  function movies(data) {
    setReturnedMovies(data);
  }

  return (
    <div
      className="text-center grid grid-col-1 gap-8 pt-4"
      style={
        dark
          ? {
              background: "#1F2937",
              color: "white",
              height: "100vh",
              width: "100%"
            }
          : { background: "white", height: "100%", width: "100%" }
      }
    >
      <Header
        setDark={() => setDark(!dark)}
        content={(res) => movies(res)}
        goBack={goBack}
        dark={dark}
      />

      <div
        style={
          dark
            ? { background: "#1F2937", margin: "0" }
            : { background: "white" }
        }
        className="grid gap-7
      xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 justify-items-center md:grid-cols-2 px-6 py-6"
      >
        {returnedMovies.length === 0
          ? [0, 1, 2, 3, 4, 5, 6].map(() => {
              return (
                <Skeleton
                  style={
                    dark ? { background: "#f8f8ff" } : { background: "#1F2937" }
                  }
                  variant="rectangle"
                  width={304}
                  height={716}
                  className="rounded-xl"
                ></Skeleton>
              );
            })
          : returnedMovies
              .filter((movie) => movie.poster_path)
              .map((movie, index) => {
                return (
                  <Card
                    cardDarkProp={dark}
                    key={index}
                    title={movie.title}
                    overview={
                      movie.overview === ""
                        ? "NO DESCRIPTION FOUND!"
                        : movie.overview.length <= 380
                        ? movie.overview
                        : movie.overview.slice(0, 400) + "..."
                    }
                    rating={movie.vote_average}
                    releaseDate={movie.release_date}
                    imgSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                );
              })}
      </div>
      <div
        style={
          dark
            ? {
                background: "#1F2937",
                ...paginationContainerStyles
              }
            : {
                background: "white",
                ...paginationContainerStyles
              }
        }
      >
        <Stack
          className="shadow-xl"
          style={
            dark
              ? {
                  background: "white",
                  ...paginationStyles
                }
              : {
                  background: "#0a1929",
                  ...paginationStyles
                }
          }
          spacing={2}
        >
          <Pagination
            classes={{ ul: classes.ul }}
            count={20}
            onChange={(e, val) => getPageData(val)}
          />
        </Stack>
      </div>
    </div>
  );
}
