let currentPage = 1;
      const itemsPerPage = 2;
      let catImages = [];
      let totalPages;

      // Fetch Cat Images from API
      async function fetchCatImages() {
        try {
          const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          catImages = data; // Store all the cat images
          totalPages = Math.ceil(catImages.length / itemsPerPage); // Dynamically calculate total pages
          displayImages();
        } catch (error) {
          console.error('Fetch error:', error);
          alert('Failed to load cat images.');
        }
      }

      function displayImages() {
        const container = document.getElementById("cat-images-container");
        container.innerHTML = ''; // Clear previous images

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Display only the images for the current page
        const pageImages = catImages.slice(start, end);

        pageImages.forEach(cat => {
          const img = document.createElement("img");
          img.src = cat.url;
          img.alt = 'A cute cat'; // Added alt text for accessibility
          container.appendChild(img);
        });

        // Handle button states
        document.getElementById("prev-btn").disabled = currentPage === 1;
        document.getElementById("next-btn").disabled = currentPage === totalPages;
      }

      function prevPage() {
        if (currentPage > 1) {
          currentPage--;
          displayImages();
        }
      }

      function nextPage() {
        if (currentPage < totalPages) {
          currentPage++;
          displayImages();
        }
      }

      // Initial Fetch
      fetchCatImages();