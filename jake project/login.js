document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (username === 'jake' && password === 'adminJake123') {
        // Successful login
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        // Failed login
        alert('Invalid username or password');
    }
});