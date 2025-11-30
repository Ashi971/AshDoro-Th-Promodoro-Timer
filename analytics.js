// Fetch data from backend
fetch("/api/analytics")
    .then(res => res.json())
    .then(data => {
        let dates = data.map(item => item.date);
        let minutes = data.map(item => item.totalMinutes);
        let sessions = data.map(item => item.sessions);

        // Summary
        document.getElementById("totalFocus").textContent =
            minutes.reduce((a, b) => a + b, 0) + " min";

        document.getElementById("totalSessions").textContent =
            sessions.reduce((a, b) => a + b, 0);

        let maxIndex = minutes.indexOf(Math.max(...minutes));
        document.getElementById("bestDay").textContent = dates[maxIndex];

        drawLineChart(dates, minutes);
        drawBarChart(dates, sessions);
    });


// Line Chart
function drawLineChart(labels, minutes) {
    new Chart(document.getElementById("focusLineChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Daily Focus Time (min)",
                data: minutes,
                borderWidth: 3,
                borderColor: "blue",
                fill: false,
                tension: 0.3
            }]
        }
    });
}

// Bar Chart
function drawBarChart(labels, sessions) {
    new Chart(document.getElementById("sessionBarChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Pomodoro Sessions",
                data: sessions,
                borderWidth: 1
            }]
        }
    });
}
