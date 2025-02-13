import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    }
};
const App = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const fetchMovies = async () => {
        try {
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error(`Error fetching Movies: ${response.statusText}`)
            }
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(`Error fetching Movies: ${error}`)
            setErrorMessage('Error fetching Movies, Please try again later')
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);
    return (
        <main>
        <div className={"patten"}/>
            <div className={"wrapper"}>
                <header>
                     <img src={'./hero.png'} alt={'Hero Banner'}/>
                    <h1>Find <span className={"text-gradient"}>Movies</span> You&#39;ll Enjoy without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                <section className={'all-movies'}>
                    <h2>All Movies</h2>


                    {errorMessage && <p className={'text-red-500'}>{errorMessage}</p>}
                </section>

            </div>

        </main>
    );
};

export default App;