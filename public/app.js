document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
  });
  
  async function fetchMovies() {
    try {
      const response = await fetch('/api/movies');
      const movies = await response.json();
  
      const moviesContainer = document.getElementById('movies');
      moviesContainer.innerHTML = '';
  
      movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;
        moviesContainer.appendChild(movieElement);
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  