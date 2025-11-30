let timer;
let timeLeft = 25 * 60; 
let totalTime = 25 * 60;
let sessionStartTime = null;
let isRunning = false;
let currentTask = "General Focus";
let currentMode = "pomodoro";
let isBreakMode = false;

const timerDisplay = document.getElementById("timer");
const timerLabel = document.getElementById("timerLabel");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const tipsContainer = document.getElementById("tipsContainer");
const modeButtons = document.querySelectorAll(".mode-btn");

// Productivity tips array
const productivityTips = [
    "🎯 Break large tasks into smaller, manageable chunks",
    "🚫 Eliminate distractions - put your phone on silent mode",
    "💧 Stay hydrated! Keep water nearby during focus sessions",
    "🎵 Try instrumental music or white noise for better focus",
    "👀 Follow the 20-20-20 rule: Every 20 minutes, look 20 feet away for 20 seconds",
    "📝 Write down distracting thoughts to deal with later",
    "🌟 Start with the most challenging task when you're fresh",
    "⏰ Time-box your tasks to create urgency and focus",
    "🧘 Take deep breaths before starting a focus session",
    "✅ Celebrate small wins to maintain motivation",
    "🎨 Keep your workspace clean and organized",
    "📱 Use website blockers during focus time",
    "🌱 Take regular breaks to maintain peak performance",
    "💪 Physical exercise boosts mental clarity and focus"
];

let currentTipIndex = 0;

// Timer mode selection
modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (isRunning) return; // Don't allow mode change during timer
        
        // Update active state
        modeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Get mode details
        currentMode = btn.dataset.mode;
        const minutes = parseInt(btn.dataset.minutes);
        isBreakMode = btn.classList.contains("break-mode");
        
        // Reset timer
        timeLeft = minutes * 60;
        totalTime = minutes * 60;
        updateDisplay();
        
        // Update label
        timerLabel.textContent = isBreakMode ? "BREAK TIME" : "FOCUS TIME";
        
        // Reset background if it was changed
        document.body.style.transition = "background 1s ease";
        document.body.style.backgroundImage = "linear-gradient(to top,#001F3F,#0F52BA)";
    });
});

function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;

    timerDisplay.textContent =
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    // Ask for task name only if it's a focus session (not break)
    if (!isBreakMode) {
        const taskName = prompt("What are you working on?", currentTask);
        if (taskName === null || taskName.trim() === "") {
            return; // User cancelled
        }
        currentTask = taskName.trim();
    }
    
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    isRunning = true;
    
    // Start background animation
    startBackgroundAnimation();
    
    // Show new tip
    showRandomTip();
    
    // Record when session started
    if (!sessionStartTime) {
        sessionStartTime = new Date();
    }

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
            updateBackgroundProgress();
        } else {
            // Timer completed!
            clearInterval(timer);
            completeSession();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    stopBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    isRunning = false;
    
    // Save partial session only if it was a focus session
    if (!isBreakMode && sessionStartTime && timeLeft < totalTime) {
        saveSession(false); // false = incomplete
    }
    
    // Reset timer
    timeLeft = totalTime;
    sessionStartTime = null;
    updateDisplay();
    
    // Reset background
    resetBackground();
}

function completeSession() {
    // Save session only if it was a focus session
    if (!isBreakMode) {
        saveSession(true); // true = completed
    }
    
    // Reset timer
    const completedMode = currentMode;
    timeLeft = totalTime;
    sessionStartTime = null;
    stopBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    isRunning = false;
    updateDisplay();
    
    // Reset background
    resetBackground();
    
    // Show completion message
    if (isBreakMode) {
        alert("✨ Break complete! Ready to focus again?");
    } else {
        alert("🎉 " + completedMode.charAt(0).toUpperCase() + completedMode.slice(1) + " session complete! Great work on: " + currentTask);
        // Suggest a break
        if (confirm("Take a break? Click OK for a 5-minute break.")) {
            // Switch to short break mode
            document.querySelector('[data-mode="shortbreak"]').click();
        }
    }
}

function saveSession(completed) {
    const endTime = new Date();
    const durationMinutes = completed ? Math.floor(totalTime / 60) : Math.floor((totalTime - timeLeft) / 60);
    
    // Get existing sessions from localStorage
    let sessions = JSON.parse(localStorage.getItem('pomodoroSessions') || '[]');
    
    // Categorize task
    const category = categorizeTask(currentTask);
    
    // Create new session object
    const session = {
        id: Date.now(),
        taskName: currentTask,
        category: category,
        duration: durationMinutes,
        completed: completed,
        mode: currentMode,
        startTime: sessionStartTime.toISOString(),
        endTime: endTime.toISOString(),
        date: endTime.toLocaleDateString('en-US')
    };
    
    // Add to sessions array
    sessions.push(session);
    
    // Save back to localStorage
    localStorage.setItem('pomodoroSessions', JSON.stringify(sessions));
    
    console.log('Session saved:', session);
}

// Categorize tasks into activity types
function categorizeTask(taskName) {
    const task = taskName.toLowerCase();
    
    if (task.includes('study') || task.includes('learn') || task.includes('read') || task.includes('research')) {
        return 'Study';
    } else if (task.includes('code') || task.includes('program') || task.includes('debug') || task.includes('develop')) {
        return 'Coding';
    } else if (task.includes('write') || task.includes('blog') || task.includes('article') || task.includes('essay')) {
        return 'Writing';
    } else if (task.includes('design') || task.includes('draw') || task.includes('create') || task.includes('art')) {
        return 'Design';
    } else if (task.includes('meeting') || task.includes('call') || task.includes('discuss')) {
        return 'Meetings';
    } else if (task.includes('email') || task.includes('message') || task.includes('respond')) {
        return 'Communication';
    } else {
        return 'General';
    }
}

// Background animation functions
function startBackgroundAnimation() {
    document.body.style.transition = "background 2s ease";
    
    if (isBreakMode) {
        // Green gradient for break time
        document.body.style.backgroundImage = "linear-gradient(to bottom, #064635, #519872)";
    } else {
        // Start with your blue gradient, will animate as timer progresses
        document.body.style.backgroundImage = "linear-gradient(to bottom, #001F3F, #0F52BA)";
    }
}

function updateBackgroundProgress() {
    const progress = timeLeft / totalTime; // Progress from 1 to 0
    
    if (!isBreakMode) {
        // Your base colors
        const topColor = { r: 0, g: 31, b: 63 };      // #001F3F (stays constant)
        const bottomStart = { r: 15, g: 82, b: 186 }; // #0F52BA (bright blue)
        const bottomEnd = { r: 8, g: 41, b: 93 };     // Darker blue at end
        
        // Interpolate only the bottom color
        const bottomColor = interpolateColor(bottomStart, bottomEnd, 1 - progress);
        
        // Smooth transition without jarring
        document.body.style.transition = "background 0.5s ease";
        document.body.style.backgroundImage = 
            `linear-gradient(to bottom, rgb(${topColor.r}, ${topColor.g}, ${topColor.b}), rgb(${bottomColor.r}, ${bottomColor.g}, ${bottomColor.b}))`;
    }
}

function interpolateColor(color1, color2, factor) {
    return {
        r: Math.round(color1.r + (color2.r - color1.r) * factor),
        g: Math.round(color1.g + (color2.g - color1.g) * factor),
        b: Math.round(color1.b + (color2.b - color1.b) * factor)
    };
}

function resetBackground() {
    document.body.style.transition = "background 2s ease";
    document.body.style.backgroundImage = "linear-gradient(to bottom, #001F3F, #0F52BA)";
}

// Tips system
function showRandomTip() {
    currentTipIndex = Math.floor(Math.random() * productivityTips.length);
    const tipText = document.getElementById("tipText");
    
    // Fade out
    tipsContainer.style.opacity = "0";
    
    setTimeout(() => {
        tipText.textContent = productivityTips[currentTipIndex];
        // Fade in
        tipsContainer.style.opacity = "1";
    }, 300);
}

// Cycle through tips every 30 seconds during timer
setInterval(() => {
    if (isRunning && !isBreakMode) {
        showRandomTip();
    }
}, 30000);

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

updateDisplay();