let currentPage = 1;

function fetchData(page = 1) {
    const API_KEY = '6f373c9f127410be9a712fd291a9eb73';
    const TMDB_ENDPOINT = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;


fetch(`${TMDB_ENDPOINT}?api_key=${API_KEY}`)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    const movieListElement = document.getElementById('movieList');

    data.results.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie');
        movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title} Poster">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class="green">${movie.vote_average}</span>
        </div>
        <div class="overview">${movie.overview}</div>
        `;
        movieListElement.appendChild(movieItem);
    });
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}
function loadNextPage() {
    currentPage++;
    fetchData(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', searchMovies);
});

function searchMovies() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const movies = document.querySelectorAll('.movie');

    movies.forEach(movie => {
        const title = movie.querySelector('.movie-info h3').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('hiasd')
    fetchCinemas()

    function fetchCinemas() {
        fetch('http://localhost:3000/api/cinemas')
          .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json()
            })
            .then(cinemas => {
                console.log('Data Cinemas:', cinemas)
                displayCinemas(cinemas)
            })
            .catch(error => {
                console.error('Error fetching cinemas:', error);
            });
        }
      
  
    function displayCinemas(cinemas) {
        const cinemaList = document.querySelector('.cinema-list');
    
        cinemas.forEach(cinema => {
            const cinemaItem = document.createElement('div');
            cinemaItem.classList.add('cinema-item');
            cinemaItem.innerHTML = `
            <h3>${cinema.name}</h3>
            <div class="icons">
                <span class="icon" onclick="updateCinema(${cinema.id})">
                <i class="bi bi-pencil"></i>
                </span>
                <span class="icon" onclick="deleteCinema(${cinema.id})">
                <i class="bi bi-trash"></i>
                </span>
            </div>
            `;
            cinemaList.appendChild(cinemaItem);
        });
    }

    
  
    function addCinema() {
    }
  
    function updateCinema(cinemaId) {
        $('#updateCinemaModal').modal('show');
    }

    function save() {
        $(`updateCinemaModal`).modal('hide')
    }
    
    function deleteCinema(cinemaId) {
    }
})
    
    
    function redirectToLoginForm() {
        window.location.href = 'login.html';
    }
    
function goToIndex() {
    window.location.href = 'index.html';
}

function redirectToList() {
    window.location.href = 'cinemas.html';
}

function updateMovie() {
    showAlert('Update icon clicked');
}

function deleteMovie() {
    showAlert('Delete icon clicked');
}

function showAlert(message) {
    alert(message);
}

document.addEventListener('DOMContentLoaded', fetchData);

function redirectToLoginForm() {
    window.location.href = 'login.html';
}
