
const statusDisplayElement = document.getElementById('statusDisplay');

function addTask() {
    // Get input value
    const taskText = document.getElementById("taskInput").value;
    if (taskText === "") return;

    // Create new list item
    const li = document.createElement("li");
    li.textContent = taskText;
    li.className = "task"; // Add styling via class

    // Append to the list
    document.getElementById("taskList").appendChild(li);

    // Clear input
    document.getElementById("taskInput").value = "";
  }

function changeStatus(){
    const currentStatus = "System: Online, CPU Load: 25%, Memory Usage: 60%";
    statusDisplayElement.textContent = "Current Status: " + currentStatus;
}

function loadSetup(){
    // Simulate fetching status after 2 seconds
    setTimeout(changeStatus(), 2000); // 2000 milliseconds = 2 seconds
}


// Create random sensor data
function getSensorData() {
    return {
        temperature: (Math.random() * 10 + 20).toFixed(1), // 20-30°C
        humidity: (Math.random() * 40 + 30).toFixed(1)     // 30-70%
    };
}

// Fetch data every 2 seconds (simulated)
setInterval(updateDashboard, 2000);

// For real data, replace with:
// async function getSensorData() {
//     const response = await fetch('http://your-server/api/sensors');
//     return await response.json();
// }

function updateDashboard() {
    const data = getSensorData();

    // Update temperature
    const tempValue = document.getElementById('temp-value');
    const tempStatus = document.getElementById('temp-status');
    tempValue.textContent = data.temperature;
    tempStatus.style.backgroundColor = (data.temperature > 25) ? 'red' : 'green';

    // Update humidity
    const humidityValue = document.getElementById('humidity-value');
    const humidityStatus = document.getElementById('humidity-status');
    humidityValue.textContent = data.humidity;
    humidityStatus.style.backgroundColor = (data.humidity > 50) ? 'red' : 'green';

    // Update chart (see next step)
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

// Start the dashboard
updateDashboard();