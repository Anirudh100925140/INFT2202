document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        service: document.getElementById('service').value,
        notes: document.getElementById('message').value,
        status: 'Pending',
        timestamp: new Date().toISOString()
    };

    // Save appointment to localStorage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(formData);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Show success message
    alert('Appointment booked successfully!');

    // Submit form to email
    this.submit();
});