import { useState } from "react";

export default function Input({ content, setDark, goBack, dark }) {
  const [query, setQuery] = useState("");
  const [submitedQuery, setSubmitedQuery] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();
    setQuery("");
    setSubmitedQuery(query);
    const requestUrl = `https://api.themoviedb.org/3/search/movie?api_key=085ef2d4b31c38c944f304be6504cc16&language=en-USA&query=${query}`;
    try {
      const res = await fetch(requestUrl);
      const data = await res.json();
      content(data.results);
    } catch (error) {
      console.log("ERROR" + error);
    }
  };

  return (
    <>
      <h1 className="text-large underline text-xl font-bold text-red-700 ">
        LINGO MOVIE APP
      </h1>

      <p className="text-center">Search for A movie</p>
      <form
        method="POST"
        onSubmit={searchMovies}
        className="flex flex-col px-14 lg:px-60 -pt-7"
      >
        <input
          required
          className="flex-shrink bg-grey-400 text-black text-center border border-black p-2 rounded focus:outline-none focus:border-red-400 focus:bg-white"
          value={query}
          name="search"
          placeholder="e.g Jurrasic World"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="submit"
          value="Search"
          className="p-2 bg-red-500 rounded m-2  cursor-pointer hover:bg-red-700"
        />
      </form>
      <div className="flex justify-between px-3 flex-wrap lg:px-7 md:px-4">
        <h2 className="text-red-500 text-bold p flex items-center text-left">
          {submitedQuery === "" ? "Popular Movies" : submitedQuery}
        </h2>

        <button onClick={setDark}>
          {dark ? (
            <div className="flex items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lightbulb"
                viewBox="0 0 16 16"
              >
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
              </svg>
              <span>Light Mode</span>
            </div>
          ) : (
            <div className="flex items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lightbulb-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z" />
              </svg>{" "}
              <span>Dark Mode</span>
            </div>
          )}
        </button>
        <button
          onClick={goBack}
          className="bg-red-500 hover:bg-red-700 rounded px-4"
        >
          Back
        </button>
      </div>
    </>
  );
}
