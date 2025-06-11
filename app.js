// app.js – Handles To-Do, Timer, and Calendar logic
// NOTE: This assumes separate script tags are removed in HTML and replaced by <script src="app.js">

document.addEventListener("DOMContentLoaded", () => {
  // To-Do Logic
  if (document.getElementById("taskList")) {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between bg-gray-100 p-2 rounded";
        li.innerHTML = \`
          <span class="\${task.done ? 'line-through text-gray-500' : ''}">\${task.text}</span>
          <div class="flex gap-2">
            <button onclick="toggleDone(\${index})" class="text-green-600 hover:underline">✔</button>
            <button onclick="deleteTask(\${index})" class="text-red-600 hover:underline">✖</button>
          </div>\`;
        taskList.appendChild(li);
      });
    }

    window.addTask = () => {
      const text = taskInput.value.trim();
      if (text !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text, done: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
      }
    };

    window.toggleDone = (index) => {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks[index].done = !tasks[index].done;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    window.deleteTask = (index) => {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    loadTasks();
  }

  // Timer Logic
  if (document.getElementById("timer")) {
    let time = 25 * 60, timerID = null;
    const timerEl = document.getElementById("timer");

    function updateDisplay() {
      const mins = String(Math.floor(time / 60)).padStart(2, '0');
      const secs = String(time % 60).padStart(2, '0');
      timerEl.textContent = \`\${mins}:\${secs}\`;
    }

    window.startTimer = () => {
      if (timerID) return;
      timerID = setInterval(() => {
        if (time > 0) {
          time--;
          updateDisplay();
        } else {
          clearInterval(timerID);
          alert("Time's up!");
          timerID = null;
        }
      }, 1000);
    };

    window.pauseTimer = () => {
      clearInterval(timerID);
      timerID = null;
    };

    window.resetTimer = () => {
      window.pauseTimer();
      time = 25 * 60;
      updateDisplay();
    };

    updateDisplay();
  }

  // Calendar Logic
  if (document.getElementById("calendarBody")) {
    const calendarBody = document.getElementById("calendarBody");
    const monthPicker = document.getElementById("monthPicker");

    monthPicker.value = new Date().toISOString().slice(0, 7);
    monthPicker.addEventListener("change", drawCalendar);

    function drawCalendar() {
      const [year, month] = monthPicker.value.split("-").map(Number);
      const firstDay = new Date(year, month - 1, 1).getDay();
      const totalDays = new Date(year, month, 0).getDate();

      calendarBody.innerHTML = "";
      let row = document.createElement("tr");
      for (let i = 0; i < firstDay; i++) row.innerHTML += "<td class='p-2 border'></td>";

      for (let d = 1; d <= totalDays; d++) {
        if ((firstDay + d - 1) % 7 === 0 && d !== 1) {
          calendarBody.appendChild(row);
          row = document.createElement("tr");
        }
        row.innerHTML += \`<td class='p-2 border hover:bg-indigo-100 cursor-pointer'>\${d}</td>\`;
      }
      calendarBody.appendChild(row);
    }

    drawCalendar();
  }
});