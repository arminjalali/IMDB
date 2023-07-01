//API KEY = k_159zi4od

// Get references to HTML elements
const searchButton = document.getElementById('search-button');

// Add event listener to the search button
searchButton.addEventListener('click', handleSearch);

// Function to handle the search action
function handleSearch() {
  const apiKey = document.querySelector('.api-field').value;
  const searchTerm = document.querySelector('#search-bar').value;

  // Make a request to search for movies
  const searchUrl = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${searchTerm}`;
  fetchData(searchUrl)
    .then(data => {
      if (data.results.length > 0) {
        const firstResult = data.results[0];
        const movieId = firstResult.id;

        // Make a request to get the complete movie information
        const movieUrl = `https://imdb-api.com/en/API/Title/${apiKey}/${movieId}`;
        fetchData(movieUrl)
          .then(movieData => {
            // Populate the content rectangles with the movie information
            const searchedMovieElement = document.querySelector('#searched-movie');

            // Update the HTML content with the movie information
            document.getElementById('movie-poster').src = movieData.image;
            document.getElementById('movie-title').textContent = movieData.title;
            document.getElementById('movie-year').textContent = movieData.year;
            document.getElementById('movie-duration').textContent = movieData.runtimeStr;
            document.getElementById('movie-genre').textContent = movieData.genres;
            document.getElementById('movie-actors').textContent = movieData.stars;
            document.getElementById('movie-rating').textContent = movieData.imDbRating;

            if (movieData.ranking && movieData.ranking.rank) {
              document.getElementById('movie-rank').textContent = movieData.ranking.rank;
              document.getElementById('movie-awards').textContent = movieData.awards || 'None';
            } else {
              document.getElementById('movie-rank').textContent = 'N/A';
              document.getElementById('movie-awards').textContent = 'None';
            }

            // Add event listener to movie genre span for hover effect
            const genreSpan = document.getElementById('movie-genre');
            genreSpan.addEventListener('mouseover', () => {
              genreSpan.style.textDecoration = 'underline';
            });
            genreSpan.addEventListener('mouseout', () => {
              genreSpan.style.textDecoration = 'none';
            });

            searchedMovieElement.style.display = 'block';
          });
      } else {
        // Handle case when no results are found
        console.log('No results found.');
      }
    });
}

// Function to make an HTTP GET request and fetch data
function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log('Error:', error));
}

 // Add event listener to the theme toggle switch
 const themeToggle = document.getElementById('theme-toggle');
 themeToggle.addEventListener('change', handleThemeToggle);

 // Function to handle theme toggle
 function handleThemeToggle() {
   const body = document.body;
   if (themeToggle.checked) {
     body.classList.add('dark');
     body.classList.remove('light');
   } else {
     body.classList.add('light');
     body.classList.remove('dark');
   }
 }