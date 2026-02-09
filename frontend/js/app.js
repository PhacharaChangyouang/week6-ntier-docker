// ============================================
// Task Board Frontend Application
// ENGSE207 - Week 7 Cloud Version
// ============================================

// ⚠️ เปลี่ยน URL นี้เป็น API URL ของคุณบน Railway
const API_BASE = 'https://independent-charm-production-ffa6.up.railway.app/api';

// ============================================
// API Functions
// ============================================

async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'API Error');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ... (rest of the code remains the same)