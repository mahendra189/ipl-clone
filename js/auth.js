// User authentication and management
const auth = {
    // Store users in localStorage (in a real app, this would be a database)
    users: JSON.parse(localStorage.getItem('users')) || [],
    
    // Register a new user
    register: function(fullName, email, password) {
        // Validate email format
        if (!this.validateEmail(email)) {
            throw new Error('Invalid email format');
        }
        
        // Check if email already exists
        if (this.users.some(user => user.email === email)) {
            throw new Error('Email already registered');
        }
        
        // Validate password strength
        if (!this.validatePassword(password)) {
            throw new Error('Password must be at least 8 characters long and contain at least one number and one special character');
        }
        
        // Create new user
        const newUser = {
            fullName,
            email,
            password: this.hashPassword(password), // In a real app, use proper password hashing
            createdAt: new Date().toISOString()
        };
        
        // Add user to storage
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        return true;
    },
    
    // Login user
    login: function(email, password) {
        // Find user by email
        const user = this.users.find(u => u.email === email);
        
        // Check if user exists and password matches
        if (!user || user.password !== this.hashPassword(password)) {
            throw new Error('Invalid email or password');
        }
        
        // Create session
        const session = {
            email: user.email,
            fullName: user.fullName,
            loggedInAt: new Date().toISOString()
        };
        
        return session;
    },
    
    // Validate email format
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validate password strength
    validatePassword: function(password) {
        // At least 8 characters, 1 number, and 1 special character
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return re.test(password);
    },
    
    // Simple password hashing (in a real app, use proper password hashing)
    hashPassword: function(password) {
        return btoa(password); // Base64 encoding (NOT secure, just for demo)
    },
    
    // Check if user is logged in
    isLoggedIn: function() {
        return !!localStorage.getItem('session') || !!sessionStorage.getItem('session');
    },
    
    // Get current user
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem('session') || sessionStorage.getItem('session'));
    },
    
    // Logout user
    logout: function() {
        localStorage.removeItem('session');
        sessionStorage.removeItem('session');
    }
}; 