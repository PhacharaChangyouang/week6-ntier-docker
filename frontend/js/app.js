// ============================================
// Task Board Frontend Application
// ENGSE207 - Week 7 Cloud Version
// ============================================

const API_BASE = CONFIG.API_URL;

// ============================================
// API Functions
// ============================================
async function fetchAPI(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    return response.json();
}

// ============================================
// Load + Render Tasks
// ============================================
async function loadTasks() {
    try {
        const tasks = await fetchAPI('/tasks');
        renderTasks(tasks);
    } catch (err) {
        console.error(err);
    }
}

function renderTasks(tasks) {
    const todo = document.getElementById('todo');
    const progress = document.getElementById('in-progress');
    const done = document.getElementById('done');

    todo.innerHTML = '';
    progress.innerHTML = '';
    done.innerHTML = '';

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task';

        card.innerHTML = `
            <strong>${task.title}</strong><br/>
            <small>${task.priority}</small><br/><br/>
            <button onclick="moveTask(${task.id}, 'IN_PROGRESS')">➡️</button>
            <button onclick="moveTask(${task.id}, 'DONE')">✅</button>
        `;

        if (task.status === 'TODO') {
            todo.appendChild(card);
        } else if (task.status === 'IN_PROGRESS') {
            progress.appendChild(card);
        } else {
            done.appendChild(card);
        }
    });
}

async function moveTask(id, status) {
    await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    loadTasks();
}

async function addTask() {
    const title = document.getElementById('title').value;
    await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    loadTasks();
}

// ============================================
// Start App
// ============================================
document.addEventListener('DOMContentLoaded', loadTasks);
