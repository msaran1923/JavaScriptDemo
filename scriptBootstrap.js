// Create random sensor data
function getSensorData() {
    return {
        temperature: (Math.random() * 10 + 20).toFixed(1), // 20-30°C
        humidity: (Math.random() * 40 + 30).toFixed(1)     // 30-70%
    };
}

// For real data, replace with:
// async function getSensorData() {
//     const response = await fetch('http://your-server/api/sensors');
//     return await response.json();
// }

function updateDashboard() {
    const data = getSensorData();

    // Update temperature card
    const tempValue = document.getElementById('temp-value');
    const tempCard = document.getElementById('temp-card');
    const tempStatus = document.getElementById('temp-status');
    
    tempValue.textContent = data.temperature;
    tempCard.className = 'card mb-3';
    tempCard.classList.add(data.temperature > 25 ? 'text-bg-danger' : 'text-bg-success');
    tempStatus.textContent = data.temperature > 25 ? 'High Temperature' : 'Normal Temperature';

    // Update humidity card
    const humidityValue = document.getElementById('humidity-value');
    const humidityCard = document.getElementById('humidity-card');
    const humidityStatus = document.getElementById('humidity-status');
    
    humidityValue.textContent = data.humidity;
    humidityCard.className = 'card mb-3';
    humidityCard.classList.add(data.humidity > 50 ? 'text-bg-danger' : 'text-bg-success');
    humidityStatus.textContent = data.humidity > 50 ? 'High Humidity' : 'Normal Humidity';

    updateChart(data);
}

// Initialize Chart
const ctx = document.getElementById('sensor-chart').getContext('2d');
const sensorChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Timestamps
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [],
                borderColor: 'red',
                fill: false
            },
            {
                label: 'Humidity (%)',
                data: [],
                borderColor: 'blue',
                fill: false
            }
        ]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Value' } }
        }
    }
});

// Update chart with new data
function updateChart(data) {
    const time = new Date().toLocaleTimeString();
    sensorChart.data.labels.push(time);
    sensorChart.data.datasets[0].data.push(data.temperature);
    sensorChart.data.datasets[1].data.push(data.humidity);

    // Limit to 10 data points
    if (sensorChart.data.labels.length > 10) {
        sensorChart.data.labels.shift();
        sensorChart.data.datasets[0].data.shift();
        sensorChart.data.datasets[1].data.shift();
    }

    sensorChart.update();
}

// Start the dashboard and set interval
updateDashboard();
setInterval(updateDashboard, 2000);