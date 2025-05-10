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

document.addEventListener("DOMContentLoaded", () => {
    const serviceTab = document.querySelector("#services");
    if (!serviceTab) return;

    const editor = document.getElementById("servicesEditor");
    const saveBtn = document.getElementById("saveServices");
    const clearBtn = document.getElementById("clearServices");
    const loadDefaultBtn = document.getElementById("loadDefaultBtn");
    const alertBox = document.getElementById("serviceAlert");

    const defaultServices = {
        silver: {
            title: "Silver Package (Starting $150)",
            items: [
                "Complete Vacuum (Carpet etc.)",
                "Shampoo Floor Mats",
                "Complete Interior Detail",
                "Hand Wash Exterior",
                "Door Jams Cleaned",
                "Windows Cleaned",
                "Tire Shine"
            ]
        },
        gold: {
            title: "Gold Package (Starting $250)",
            items: [
                "Complete Vacuum (Carpet etc.)",
                "Shampoo Floor Mats",
                "Complete Interior Detail",
                "Hand Wash Exterior",
                "Door Jams Cleaned",
                "Windows Cleaned",
                "Tire Shine",
                "Salt Removal",
                "Pet Hair Removal (Depends on the condition)",
                "Vinyl Conditioner/Leather Conditioner",
                "Ceramic Wash",
                "Quick Polish"
            ]
        },
        addons: {
            title: "Add-Ons",
            items: [
                "Graphene Spray-on Wax",
                "Engine Bay Wash",
                "Headlight Restoration",
                "Ceramic Coating",
                "Paint Correction"
            ]
        }
    };

    function showAlert(message, type = "success") {
        alertBox.className = `alert alert-${type} mt-3`;
        alertBox.textContent = message;
        alertBox.classList.remove("d-none");
        setTimeout(() => alertBox.classList.add("d-none"), 3000);
    }

    // Load saved or default JSON
    try {
        const current = localStorage.getItem("gline_services");
        editor.value = current ? JSON.stringify(JSON.parse(current), null, 2) : JSON.stringify(defaultServices, null, 2);
    } catch (e) {
        editor.value = JSON.stringify(defaultServices, null, 2);
        showAlert("Invalid saved data found. Loaded defaults.", "warning");
    }

    saveBtn.addEventListener("click", () => {
        try {
            const newData = JSON.parse(editor.value);
            localStorage.setItem("gline_services", JSON.stringify(newData));
            showAlert("Services saved successfully!", "success");
        } catch (e) {
            showAlert("Invalid JSON format. Please check your data.", "danger");
        }
    });

    clearBtn.addEventListener("click", () => {
        editor.value = "";
    });

    loadDefaultBtn.addEventListener("click", () => {
        editor.value = JSON.stringify(defaultServices, null, 2);
        showAlert("Default services loaded.", "info");
    });
});
