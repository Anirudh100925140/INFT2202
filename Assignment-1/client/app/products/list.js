// Fetch data from API
fetch('https://inft2202-server.onrender.com/api/products')  
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById('product-list').getElementsByTagName('tbody')[0];
    const pagination = document.getElementById('pagination');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Hide loading spinner once data is fetched
    loadingSpinner.style.display = 'none';
    
    // Function to render products
    function renderProducts(products) {
      productList.innerHTML = '';  // Clear existing products
      products.forEach(product => {
        const row = document.createElement('tr');
        
        // adding table with data 
        row.innerHTML = `
          <td>${product.name}</td>
          <td>${product.description ? product.description : 'No description'}</td>
          <td>${product.stock}</td>
          <td>$${product.price}</td>
          <td><button class="btn btn-info">Action</button></td>
        `;
        
        productList.appendChild(row);
      });
    }
    
    // Function to render pagination
    function renderPagination(page, pages) {
      pagination.innerHTML = '';  // Clear existing pagination
      for (let i = 1; i <= pages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.innerHTML = `
          <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
        `;
        pagination.appendChild(pageItem);
      }
    }

    
    window.goToPage = function(page) {
      const itemsPerPage = document.getElementById('itemsPerPage').value;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      const paginatedData = data.records.slice(startIndex, endIndex);

      renderProducts(paginatedData);
      renderPagination(page, data.pagination.pages);
    };

    // Initial render of products and pagination
    renderProducts(data.records.slice(0, 10)); // Show initial 10 products
    renderPagination(1, data.pagination.pages);

    // Handle items per page change
    document.getElementById('itemsPerPage').addEventListener('change', function() {
      const itemsPerPage = this.value;
      const paginatedData = data.records.slice(0, itemsPerPage);
      renderProducts(paginatedData);
      renderPagination(1, Math.ceil(data.records.length / itemsPerPage));
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
