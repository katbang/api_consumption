import { API_KEY } from "./info.js";

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const listName = document.querySelector(".movie-list").getAttribute("data-movie-list");

fetch(`https://api.themoviedb.org/3/movie/${listName}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(data => {
    const movieList = document.createDocumentFragment();
    data.results.forEach(movie => {
        const card = document.querySelector(".movie-card").content.cloneNode(true);

        card.querySelector("h2").innerText = movie.title;
        card.querySelector("img").setAttribute("src", `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        card.querySelector(".summary").innerText = movie.overview;
        card.querySelector(".original-title").innerText = movie.original_title;
        card.querySelector(".release-date").innerText = movie.release_date;

        movieList.append(card);
    })
    document.querySelector(".movie-list").append(movieList);
  })
  .catch(err => console.error(err));