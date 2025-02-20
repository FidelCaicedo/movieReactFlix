import Search from "./components/Search.jsx";
import { useEffect, useState } from "react";
import Spiner from "./components/Spiner.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movielist, setMovielist] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Error fetching Movies: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovielist([]);
        return;
      }

      setMovielist(data.results);
    } catch (error) {
      console.error(`Error fetching Movies: ${error}`);
      setErrorMessage("Error fetching Movies, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <main>
      <div className={"patten"} />
      <div className={"wrapper"}>
        <header>
          <img src={"./hero.png"} alt={"Hero Banner"} />
          <h1>
            Find <span className={"text-gradient"}>Movies</span> You&#39;ll
            Enjoy without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className={"all-movies"}>
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (
            <Spiner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movielist.map((movie) => (
                <p key={movie.id} className="text-white">
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
