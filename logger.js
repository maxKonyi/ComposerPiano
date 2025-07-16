// logger.js - Simple logging utility for debugging

class GameLogger {
    constructor() {
        this.enabled = window.location.search.includes('debug=true');
        this.history = [];
        this.maxHistory = 200; // Keep last 200 logs
    }

    log(type, message, data = {}) {
        if (!this.enabled) return;

        const timestamp = new Date().toISOString();
        const entry = { timestamp, type, message, data };
        
        // Add to history
        this.history.push(entry);
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        // Also log to console with color coding
        const colors = {
            'event': '#4CAF50',  // Green
            'state': '#2196F3',  // Blue
            'error': '#F44336',  // Red
            'warn': '#FFC107',   // Yellow
            'debug': '#9C27B0'   // Purple
        };

        const color = colors[type] || '#607D8B'; // Default gray
        console.log(
            `%c[${type.toUpperCase()}] ${message}`, 
            `color: ${color}; font-weight: bold;`, 
            data
        );
    }

    // Convenience methods
    event(message, data) { this.log('event', message, data); }
    state(message, data) { this.log('state', message, data); }
    error(message, data) { this.log('error', message, data); }
    warn(message, data) { this.log('warn', message, data); }
    debug(message, data) { this.log('debug', message, data); }

    // Get recent logs
    getRecentLogs(limit = 20) {
        return this.history.slice(-limit);
    }
}

// Create and export singleton instance
const logger = new GameLogger();
window.logger = logger; // Make globally available

// Log page load
logger.event('Logger initialized', {
    debugMode: logger.enabled,
    timestamp: new Date().toISOString()
});

export default logger;
