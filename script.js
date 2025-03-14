document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage when the page loads
  loadTasks();

  // Add Task
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
      saveTasks();
    }
  });

  // Add Task on Enter Key
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  // Function to Add Task
  function addTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="button-container">
        <button class="edit-btn">EDIT</button>
        <button class="delete-btn">DELETE</button>
      </div>
    `;
    taskList.appendChild(li);

    // Edit Task
    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      const taskTextElement = li.querySelector('.task-text');
      const newText = prompt('Edit your task:', taskTextElement.textContent);
      if (newText !== null && newText.trim() !== '') {
        taskTextElement.textContent = newText.trim();
        saveTasks();
      }
    });

    // Delete Task
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks();
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
      tasks.push(li.querySelector('.task-text').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
  }
});