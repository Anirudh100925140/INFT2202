function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointmentsList = document.getElementById('appointmentsList');
    
    appointmentsList.innerHTML = appointments.map(appointment => `
        <tr>
            <td>${new Date(appointment.date).toLocaleDateString()}</td>
            <td>
                <div>${appointment.name}</div>
                <small class="text-muted">${appointment.email}</small>
            </td>
            <td>${appointment.phone}</td>
            <td>${appointment.service}</td>
            <td>
                <span class="badge ${appointment.status === 'Pending' ? 'bg-warning' : 'bg-success'}">
                    ${appointment.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-success me-1" onclick="updateStatus('${appointment.timestamp}', 'Confirmed')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteAppointment('${appointment.timestamp}')">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateStatus(timestamp, newStatus) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments = appointments.map(app => {
        if (app.timestamp === timestamp) {
            app.status = newStatus;
        }
        return app;
    });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments();
}

function deleteAppointment(timestamp) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments = appointments.filter(app => app.timestamp !== timestamp);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
    }
}

// Load appointments when page loads
document.addEventListener('DOMContentLoaded', loadAppointments);