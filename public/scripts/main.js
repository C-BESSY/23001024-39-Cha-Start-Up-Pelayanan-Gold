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


// Cinemas
document.addEventListener('DOMContentLoaded', () => {
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
            <h6>${cinema.location}</h6>
            <div class="icons">
                <span class="update" data-toggle="modal" data-target="#cinemaModal${cinema.id}">
                    <i class="bi bi-pencil"></i>
                </span>
                <span class="delete" onclick="deleteCinema(${cinema.id})">
                    <i class="bi bi-trash"></i>
                </span>
            </div>
            <div class="modal fade" id="cinemaModal${cinema.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Cinema</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form  orm id="updateCinemaForm${cinema.id}" onsubmit="updateCinema(event, ${cinema.id})">
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="cinemaName">Nama Cinema</label>
                                    <input type="text" class="form-control" id="cinemaName" name="name" required value="${cinema.name}">
                                    <label for="cinemaName">Alamat Cinema</label>
                                    <input type="text" class="form-control" id="cinemaName" name="location" required value="${cinema.location}">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `;
            cinemaList.appendChild(cinemaItem);
        });
    }
})


// Auditorium
document.addEventListener('DOMContentLoaded', () => {
    fetchAuditoriums();
  
    function fetchAuditoriums() {
      fetch('http://localhost:3000/api/auditoriums')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(auditoriums => {
          console.log('Data Auditoriums:', auditoriums);
          displayAuditoriums(auditoriums);
        })
        .catch(error => {
          console.error('Error fetching auditoriums:', error);
        });
    }
  
    function displayAuditoriums(auditoriums) {
        const auditoriumList = document.querySelector('.auditorium-list');

        auditoriums.forEach(auditorium => {
            const auditoriumItem = document.createElement('div');
            auditoriumItem.classList.add('auditorium-item');
            auditoriumItem.innerHTML = `
                <h3>${auditorium.nama_auditorium}</h3>
                <p>Price: ${auditorium.price}</p>
                <p>Weekend Price: ${auditorium.price_weekend}</p>
                <p>Cinema: ${auditorium.cinema_id}</p>
                <div class="icons">
                    <span class="update" data-toggle="modal" data-target="#auditoriumModal${auditorium.id}">
                        <i class="bi bi-pencil"></i>
                    </span>
                    <span class="delete" onclick="deleteAuditorium(${auditorium.id})">
                        <i class="bi bi-trash"></i>
                    </span>
                </div>
            </div>
            <div class="modal fade" id="auditoriumModal${auditorium.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Auditorium</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="updateAuditoriumForm${auditorium.id}" onsubmit="updateAuditorium(event, ${auditorium.id})">
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="auditoriumName">Nama Auditorium</label>
                                    <input type="text" class="form-control" id="auditoriumName" name="nama_auditorium" required value="${auditorium.nama_auditorium}">
                                    <label for="hargaAuditorium">Price</label>
                                    <input type="text" class="form-control" id="hargaAuditorium" name="price" required value="${auditorium.price}">
                                    <label for="hargaWeekend">Weekend Price</label>
                                    <input type="text" class="form-control" id="hargaWeekend" name="price_weekend" required value="${auditorium.price_weekend}">
                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `;
            auditoriumList.appendChild(auditoriumItem);
        });
        fetchCinemas();
    }

    function fetchCinemas() {
        fetch('http://localhost:3000/api/cinemas')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(cinemas => {
            console.log('Data Cinemas:', cinemas);
            displayCinemasDropdown(cinemas);
        })
        .catch(error => {
            console.error('Error fetching cinemas:', error);
        });
    }

    function displayCinemasDropdown(cinemas, selectedCinemaId) {
        const cinemaDropdown = document.getElementById('cinemaDropdown');
        cinemaDropdown.innerHTML = ''
    
        cinemas.forEach(cinema => {
            const option = document.createElement('option');
            option.value = cinema.id;
            option.textContent = cinema.name;
    
            if (cinema.id === selectedCinemaId) {
                option.selected = true;
            }
    
            cinemaDropdown.appendChild(option);
        });
    }



  
    function addAuditorium() {
        const auditoriumData = {
            // Retrieve values from your form or other user input
            nama_auditorium: document.getElementById('auditoriumName').value,
            price: document.getElementById('hargaAuditorium').value,
            price_weekend: document.getElementById('hargaWeekend').value,
            // Add other properties as needed
            cinema_id: document.getElementById('cinemaName').value,
        };
    
        // Make a POST request to add the new auditorium
        fetch('http://localhost:3000/api/auditoriums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(auditoriumData),
        })
        .then(response => response.json())
        .then(newAuditorium => {
            console.log('New Auditorium added:', newAuditorium);
            fetchAuditoriums();
        })
        .catch(error => {
            console.error('Error adding auditorium:', error);
        });
    }
    
    function updateAuditorium(auditoriumId) {
        const updatedAuditoriumData = {
            nama_auditorium: document.getElementById('auditoriumName').value,
            price: document.getElementById('hargaAuditorium').value,
            price_weekend: document.getElementById('hargaWeekend').value,
            cinema_id: document.getElementById('cinemaName').value,
        };
    
        fetch(`http://localhost:3000/api/auditoriums/${auditoriumId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAuditoriumData),
        })
        .then(response => response.json())
        .then(updatedAuditorium => {
            console.log('Auditorium updated:', updatedAuditorium);
            // Optionally, fetch and display auditoriums again after updating
            fetchAuditoriums();
        })
        .catch(error => {
            console.error('Error updating auditorium:', error);
        });
    }
    
    function deleteAuditorium(auditoriumId) {
        // Make a DELETE request to delete the auditorium
        fetch(`http://localhost:3000/api/auditoriums/${auditoriumId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Auditorium deleted successfully');
                // Optionally, fetch and display auditoriums again after deleting
                fetchAuditoriums();
            } else {
                throw new Error('Failed to delete auditorium');
            }
        })
        .catch(error => {
            console.error('Error deleting auditorium:', error);
        });
    }
    
});

    
    
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
