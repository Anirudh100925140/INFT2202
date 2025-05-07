document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Default credentials
    const defaultUser = 'jake';
    const defaultPass = 'adminJake123';

    if (username === defaultUser && password === defaultPass) {
        // Successful login
        window.location.href = 'admin.html';
    } else {
        // Failed login
        alert('Invalid credentials. Please try again.');
    }
});