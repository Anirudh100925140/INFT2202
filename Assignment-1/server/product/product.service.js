class ProductService {
    constructor() {
        this.host = 'https://inft2202-server.onrender.com/api/products'; 
    }

    async getProducts(page = 1, perPage = 5) {
        try {
            console.log('Fetching from URL:', this.host); 

            const url = `${this.host}?page=${page}&perPage=${perPage}`;
            const response = await fetch(url);
            console.log('Raw response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Raw data:', data); 

            return {
                products: data.records || [], 
                total: data.pagination?.count || 0, 
                totalPages: data.pagination?.pages || 1, 
                currentPage: data.pagination?.page || 1, 
                perPage: data.pagination?.perPage || 5 
            };
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }

    async updateProduct(id, product) {
        try {
            const url = `${this.host}/${id}`;
            const request = new Request(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    name: product.name,
                    description: product.description,
                    price: parseFloat(product.price),
                    stock: parseInt(product.stock)
                })
            });

            
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        if (!id) {
            throw new Error('Product ID is required');
        }

        try {
            const url = `${this.host}/${id}`;
            console.log(`Attempting to delete product with ID: ${id}`);

            const request = new Request(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors'
            });

            const response = await fetch(request);
            console.log(`Delete response status: ${response.status}`);

            if (response.status === 404) {
                throw new Error('Product not found');
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            // Return true for successful deletion
            return response.status === 204;
        } catch (error) {
            console.error('Delete operation failed:', error);
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }
}

export default new ProductService();
