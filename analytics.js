// Load data from localStorage instead of backend
function loadAnalytics() {
    const sessions = JSON.parse(localStorage.getItem('pomodoroSessions') || '[]');
    
    if (sessions.length === 0) {
        document.getElementById("taskAnalytics").innerHTML = 
            '<p style="text-align: center; color: #888; margin-top: 50px;">No sessions yet. Start your first pomodoro!</p>';
        return;
    }
    
    // Group sessions by date
    const sessionsByDate = {};
    
    sessions.forEach(session => {
        const date = session.date;
        if (!sessionsByDate[date]) {
            sessionsByDate[date] = {
                totalMinutes: 0,
                sessions: 0,
                completed: 0
            };
        }
        sessionsByDate[date].totalMinutes += session.duration;
        sessionsByDate[date].sessions += 1;
        if (session.completed) {
            sessionsByDate[date].completed += 1;
        }
    });
    
    // Convert to arrays for charts
    const dates = Object.keys(sessionsByDate).sort();
    const minutes = dates.map(date => sessionsByDate[date].totalMinutes);
    const sessionCounts = dates.map(date => sessionsByDate[date].sessions);
    
    // Display session list
    displaySessionList(sessions);
    
    // Calculate and display summary stats
    const totalMinutes = minutes.reduce((a, b) => a + b, 0);
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.completed).length;
    const focusPercentage = totalSessions > 0 ? 
        Math.round((completedSessions / totalSessions) * 100) : 0;
    
    document.getElementById("totalFocus").textContent = totalMinutes + " min";
    document.getElementById("totalSessions").textContent = totalSessions;
    document.getElementById("focusValue").textContent = focusPercentage + "%";
    
    // Find best day
    if (minutes.length > 0) {
        const maxIndex = minutes.indexOf(Math.max(...minutes));
        document.getElementById("bestDay").textContent = dates[maxIndex];
    }
    
    // Draw charts
    drawLineChart(dates, minutes);
    drawBarChart(dates, sessionCounts);
    drawRadarChart(sessions);
}

function displaySessionList(sessions) {
    const container = document.getElementById("taskAnalytics");
    container.innerHTML = '';
    
    // Show most recent sessions first
    const recentSessions = sessions.slice().reverse().slice(0, 10);
    
    recentSessions.forEach(session => {
        const item = document.createElement('div');
        item.className = 'analytics-item';
        
        const endTime = new Date(session.endTime);
        const timeStr = endTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const statusBadge = session.completed ? 
            '<span style="color: #4ADE80;">✓ Completed</span>' : 
            '<span style="color: #FFA500;">⚠ Incomplete</span>';
        
        const categoryBadge = session.category ? 
            `<span style="background: #0F52BA; padding: 2px 8px; border-radius: 5px; font-size: 12px;">${session.category}</span>` : '';
        
        item.innerHTML = `
            <div>
                <span>${session.taskName} ${categoryBadge}</span>
                <div style="font-size: 14px; color: #888; margin-top: 5px;">
                    ${session.date} at ${timeStr} ${statusBadge}
                </div>
            </div>
            <span class="analytics-time">${session.duration} min</span>
        `;
        
        container.appendChild(item);
    });
}

// Radar Chart - Session Quality by Activity Type
function drawRadarChart(sessions) {
    const canvas = document.getElementById("qualityRadarChart");
    const wrapper = document.createElement('div');
    canvas.parentNode.insertBefore(wrapper, canvas);
    wrapper.appendChild(canvas);
    
    const ctx = canvas;
    
    // Group by category
    const categoryStats = {};
    
    sessions.forEach(session => {
        const cat = session.category || 'General';
        if (!categoryStats[cat]) {
            categoryStats[cat] = {
                total: 0,
                completed: 0,
                totalDuration: 0
            };
        }
        categoryStats[cat].total += 1;
        if (session.completed) {
            categoryStats[cat].completed += 1;
        }
        categoryStats[cat].totalDuration += session.duration;
    });
    
    // Calculate quality metrics for each category
    const categories = Object.keys(categoryStats);
    const completionRates = categories.map(cat => 
        Math.round((categoryStats[cat].completed / categoryStats[cat].total) * 100)
    );
    const avgDurations = categories.map(cat =>
        Math.round(categoryStats[cat].totalDuration / categoryStats[cat].total)
    );
    const sessionCounts = categories.map(cat => categoryStats[cat].total);
    
    // Normalize scores to 0-100 scale
    const maxSessions = Math.max(...sessionCounts);
    const normalizedCounts = sessionCounts.map(count => 
        Math.round((count / maxSessions) * 100)
    );
    
    new Chart(ctx, {
        type: "radar",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Completion Rate (%)",
                    data: completionRates,
                    borderColor: "#4ADE80",
                    backgroundColor: "rgba(74, 222, 128, 0.2)",
                    borderWidth: 2,
                    pointBackgroundColor: "#4ADE80",
                    pointRadius: 4
                },
                {
                    label: "Session Frequency",
                    data: normalizedCounts,
                    borderColor: "#0F52BA",
                    backgroundColor: "rgba(15, 82, 186, 0.2)",
                    borderWidth: 2,
                    pointBackgroundColor: "#0F52BA",
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#FFFFFF',
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    pointLabels: {
                        color: '#FFFFFF',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.r;
                            if (label.includes('Completion')) {
                                return label + ': ' + value + '%';
                            } else {
                                return label + ': ' + value + '/100';
                            }
                        }
                    }
                }
            }
        }
    });
}

// Line Chart - Focus Time Over Days
function drawLineChart(labels, minutes) {
    const canvas = document.getElementById("focusLineChart");
    const wrapper = document.createElement('div');
    canvas.parentNode.insertBefore(wrapper, canvas);
    wrapper.appendChild(canvas);
    
    const ctx = canvas;
    
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Daily Focus Time (minutes)",
                data: minutes,
                borderWidth: 3,
                borderColor: "#0F52BA",
                backgroundColor: "rgba(15, 82, 186, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: "#0F52BA"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#FFFFFF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Bar Chart - Session Count
function drawBarChart(labels, sessions) {
    const canvas = document.getElementById("sessionBarChart");
    const wrapper = document.createElement('div');
    canvas.parentNode.insertBefore(wrapper, canvas);
    wrapper.appendChild(canvas);
    
    const ctx = canvas;
    
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Pomodoro Sessions",
                data: sessions,
                backgroundColor: "#4ADE80",
                borderColor: "#22C55E",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF',
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#FFFFFF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Load analytics when page loads
loadAnalytics();