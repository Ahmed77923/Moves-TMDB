const API_KEY = "23f22cab5964b20234495a81ab96ba3a";
const img = "https://image.tmdb.org/t/p/w500";





const moviesContainer = document.getElementById("movies");
const movieDetails = document.getElementById("movie-details");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

async function getMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  showMovies(data.results);
}

function showMovies(movies) {
  moviesContainer.innerHTML = "";
  movieDetails.innerHTML = "";

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${img + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p> ${movie.vote_average}</p>
    `;

    movieEl.addEventListener("click", () => {
      getMovieDetails(movie.id);
    });

    moviesContainer.appendChild(movieEl);
  });
}
getMovies();

async function getMovieDetails(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  const movie = await response.json();

  moviesContainer.innerHTML = "";
  movieDetails.innerHTML = `
    <div class="details-card">
      <img src="${img + movie.poster_path}" alt="${movie.title}">
      <div class="details-info">
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong>  ${movie.vote_average}</p>
        <p>${movie.overview}</p>
        <button id="back-btn">⬅ Back</button>
      </div>
    </div>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    getMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (query) {
    getMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
  }
});
