// Wait for the document to be ready
$(document).ready(function() {
    // Initialize components
    initializeComponents();
    
    // Load featured matches
    loadFeaturedMatches();
    
    // Load latest news
    loadLatestNews();
    
    // Handle login form submission
    handleLogin();
    
    // Handle registration form submission
    handleRegistration();
});

// Initialize Bootstrap components
function initializeComponents() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();
    
    // Check if user is logged in
    checkAuth();
}

// Load featured matches
function loadFeaturedMatches() {
    // Show loading spinner
    $('#featured-matches-container').html('<div class="col-12 text-center"><div class="spinner"></div></div>');
    
    // Simulate API call to get matches
    setTimeout(() => {
        const matches = [
            {
                team1: 'India',
                team2: 'Australia',
                score1: '285/4',
                score2: '280/8',
                status: 'Live',
                venue: 'Melbourne Cricket Ground',
                overs: '45.2'
            },
            {
                team1: 'England',
                team2: 'South Africa',
                score1: '320/6',
                score2: '315/9',
                status: 'Live',
                venue: 'Lord\'s Cricket Ground',
                overs: '48.5'
            }
        ];
        
        displayFeaturedMatches(matches);
    }, 1000);
}

// Display featured matches
function displayFeaturedMatches(matches) {
    let html = '';
    
    matches.forEach(match => {
        html += `
            <div class="col-md-6">
                <div class="match-card fade-in">
                    <div class="match-header d-flex justify-content-between align-items-center">
                        <span class="badge bg-danger">LIVE</span>
                        <small class="text-muted">${match.overs} overs</small>
                    </div>
                    <div class="match-content">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="team">
                                <div class="placeholder-image">
                                    <i class="fas fa-cricket fa-5x"></i>
                                </div>
                                <span>${match.team1}</span>
                            </div>
                            <div class="score">
                                <span class="match-score">${match.score1}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="team">
                                <div class="placeholder-image">
                                    <i class="fas fa-cricket fa-5x"></i>
                                </div>
                                <span>${match.team2}</span>
                            </div>
                            <div class="score">
                                <span class="match-score">${match.score2}</span>
                            </div>
                        </div>
                        <small class="text-muted d-block mt-3">${match.venue}</small>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#featured-matches-container').html(html);
}

// Load latest news
function loadLatestNews() {
    // Show loading spinner
    $('#latest-news-container').html('<div class="col-12 text-center"><div class="spinner"></div></div>');
    
    // Simulate API call to get news
    setTimeout(() => {
        const news = [
            {
                title: 'India Clinches Series Victory Against Australia',
                category: 'Match Report',
                date: 'March 10, 2024',
                image: 'images/news/india-aus.jpg',
                excerpt: 'India secured a thrilling victory in the final Test match against Australia, winning the series 2-1.'
            },
            {
                title: 'England Announces Squad for T20 World Cup',
                category: 'Team News',
                date: 'March 9, 2024',
                image: 'images/news/england-squad.jpg',
                excerpt: 'England has announced their 15-member squad for the upcoming T20 World Cup, with several new faces making the cut.'
            }
        ];
        
        displayLatestNews(news);
    }, 1000);
}

// Display latest news
function displayLatestNews(news) {
    let html = '';
    
    news.forEach(item => {
        html += `
            <div class="col-md-6">
                <div class="news-card fade-in">
                    <img src="${item.image}" alt="${item.title}" class="news-image">
                    <div class="news-content">
                        <span class="badge bg-primary mb-2">${item.category}</span>
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.excerpt}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${item.date}</small>
                            <a href="#" class="btn btn-outline-primary btn-sm">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#latest-news-container').html(html);
}

// Handle login form submission
function handleLogin() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');
        
        // Show loading state
        const submitBtn = $('#loginBtn');
        const originalText = submitBtn.text();
        submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Logging in...');
        
        try {
            // Attempt login
            const session = auth.login(email, password);
            
            // Store session
            if (rememberMe) {
                localStorage.setItem('session', JSON.stringify(session));
            } else {
                sessionStorage.setItem('session', JSON.stringify(session));
            }
            
            // Show success message
            showNotification('Successfully logged in!', 'success');
            
            // Close modal and redirect
            $('#loginModal').modal('hide');
            window.location.reload();
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            // Reset button state
            submitBtn.prop('disabled', false).text(originalText);
        }
    });
}

// Handle registration form submission
function handleRegistration() {
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        
        const fullName = $('#fullName').val();
        const email = $('#registerEmail').val();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#confirmPassword').val();
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = $('#registerBtn');
        const originalText = submitBtn.text();
        submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Registering...');
        
        try {
            // Attempt registration
            auth.register(fullName, email, password);
            
            // Show success message
            showNotification('Registration successful! Please login.', 'success');
            
            // Reset form and close modal
            $(this).trigger('reset');
            $('#registerModal').modal('hide');
            
            // Switch to login modal
            $('#loginModal').modal('show');
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            // Reset button state
            submitBtn.prop('disabled', false).text(originalText);
        }
    });
}

// Check if user is logged in
function checkAuth() {
    if (auth.isLoggedIn()) {
        const user = auth.getCurrentUser();
        // Update UI for logged-in user
        $('.nav-item:last-child').html(`
            <div class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    ${user.email}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                    <li><a class="dropdown-item" href="settings.html">Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </div>
        `);
    }
}

// Logout function
function logout() {
    auth.logout();
    showNotification('Successfully logged out', 'success');
    window.location.reload();
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    $('.notification').remove();
    
    // Create notification element
    const notification = $(`
        <div class="notification ${type === 'error' ? 'bg-danger text-white' : 'bg-success text-white'}">
            ${message}
        </div>
    `);
    
    // Add to page
    $('body').append(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.fadeOut(() => notification.remove());
    }, 3000);
} 