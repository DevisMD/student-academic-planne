document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const timerModeDisplay = document.getElementById('timer-mode');
    const startBtn = document.getElementById('start-timer-btn');
    const pauseBtn = document.getElementById('pause-timer-btn');
    const resetBtn = document.getElementById('reset-timer-btn');

    const WORK_MINUTES = 25;
    const BREAK_MINUTES = 5;

    let timerInterval;
    let timeLeft = WORK_MINUTES * 60; // in seconds
    let isPaused = true;
    let isWorkMode = true;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerModeDisplay.textContent = isWorkMode ? 'Work Session' : 'Break Time';
        document.title = `${timerDisplay.textContent} - ${isWorkMode ? 'Work' : 'Break'}`; // Update page title
    }

    function startTimer() {
        if (isPaused) {
            isPaused = false;
            startBtn.textContent = 'Start'; // Or disable it
            pauseBtn.disabled = false;

            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();

                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                    // Play a sound (optional, requires an audio file)
                    // const alarmSound = new Audio('path/to/alarm.mp3');
                    // alarmSound.play();

                    isWorkMode = !isWorkMode;
                    timeLeft = (isWorkMode ? WORK_MINUTES : BREAK_MINUTES) * 60;
                    isPaused = true; // Auto-pause for next session
                    startBtn.textContent = 'Start';
                    pauseBtn.disabled = true;
                    updateDisplay();
                    alert(isWorkMode ? "Break's over! Time for work." : "Work session done! Time for a break.");
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        if (!isPaused) {
            clearInterval(timerInterval);
            isPaused = true;
            startBtn.textContent = 'Resume';
            pauseBtn.disabled = true;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isPaused = true;
        isWorkMode = true; // Default to work mode on reset
        timeLeft = WORK_MINUTES * 60;
        startBtn.textContent = 'Start';
        pauseBtn.disabled = false; // Can be enabled if start is hit
        updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    updateDisplay(); // Initial display setup
    pauseBtn.disabled = true; // Pause initially disabled

    // Active navigation link highlighting for TIMER page
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'timer.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});