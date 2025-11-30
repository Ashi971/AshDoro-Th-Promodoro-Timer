let timer;
let timeLeft = 30 * 60; 

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;

    timerDisplay.textContent =
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    stopBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

updateDisplay();
