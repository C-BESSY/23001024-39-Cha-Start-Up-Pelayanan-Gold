// document.addEventListener('DOMContentLoaded', () => {
//     fetchMovies();
//   });
  
//   async function fetchMovies() {
//     try {
//       const response = await fetch('/api/movies');
//       const movies = await response.json();
  
//       const moviesContainer = document.getElementById('movies');
//       moviesContainer.innerHTML = '';
  
//       movies.forEach(movie => {
//         const movieElement = document.createElement('div');
//         movieElement.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;
//         moviesContainer.appendChild(movieElement);
//       });
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   }

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to download image from URL or read image from file path
async function getImageData(source) {
  if (source.startsWith('http')) {
    // Download image from URL
    const response = await axios.get(source, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  } else {
    // Read image from file path
    return fs.readFileSync(source);
  }
}

// Handle the image upload
app.post('/upload-image', upload.none(), async (req, res) => {
  try {
    // Get the image source from the request body
    const imageSource = req.body.imageSource;

    // Download or read the image data
    const imageData = await getImageData(imageSource);

    // Save the image data to your "movies" table
    const insertQuery = 'INSERT INTO movies (image_data) VALUES ($1) RETURNING *';
    const result = await pool.query(insertQuery, [imageData]);

    res.json({ success: true, message: 'Image uploaded successfully.', movie: result.rows[0] });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Error uploading image.' });
  }
});