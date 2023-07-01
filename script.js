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
  console.log(searchUrl);
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
            const movieDetailsElement = document.querySelector('#movie-details');

            // Update the HTML content with the movie information
            searchedMovieElement.innerHTML = `
              <img src="${movieData.image}" alt="${movieData.title}">
              <div>
                <h2>${movieData.title}</h2>
                <p>${movieData.description}</p>
              </div>
            `;

            movieDetailsElement.innerHTML = `
              <img src="${movieData.image}" alt="${movieData.title}">
              <div>
                <h2>${movieData.title}</h2>
                <p>${movieData.description}</p>
              </div>
            `;
          });
      } else {
        // Handle case when no results are found
        console.log('No results found.');
      }
    });
}
