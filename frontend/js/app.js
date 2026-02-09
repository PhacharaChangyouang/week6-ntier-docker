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
            <small>${task.priority}</small>
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

// ============================================
// Start App
// ============================================
document.addEventListener('DOMContentLoaded', loadTasks);
