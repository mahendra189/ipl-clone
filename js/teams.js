$(document).ready(function() {
    // Initialize components
    initializeComponents();
    
    // Load teams
    loadTeams();
    
    // Handle team search
    handleTeamSearch();
    
    // Handle login form submission
    handleLogin();
    
    // Handle registration form submission
    handleRegistration();
});

function initializeComponents() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();
    
    // Check if user is logged in
    checkAuth();
}

function loadTeams() {
    // Show loading spinner
    $('#teams-container').html('<div class="col-12 text-center"><div class="spinner"></div></div>');
    
    // Simulate API call to get teams
    setTimeout(() => {
        const teams = [
            {
                name: 'India',
                ranking: 1,
                captain: 'Rohit Sharma',
                coach: 'Rahul Dravid',
                image: 'https://resources.pulse.icc-cricket.com/teams/flags/test/6.png',
                stats: {
                    matches: 150,
                    wins: 95,
                    losses: 45,
                    draws: 10
                }
            },
            {
                name: 'Australia',
                ranking: 2,
                captain: 'Pat Cummins',
                coach: 'Andrew McDonald',
                image: 'https://resources.pulse.icc-cricket.com/teams/flags/test/2.png',
                stats: {
                    matches: 145,
                    wins: 85,
                    losses: 50,
                    draws: 10
                }
            },
            {
                name: 'England',
                ranking: 3,
                captain: 'Ben Stokes',
                coach: 'Brendon McCullum',
                image: 'https://resources.pulse.icc-cricket.com/teams/flags/test/1.png',
                stats: {
                    matches: 140,
                    wins: 80,
                    losses: 55,
                    draws: 5
                }
            },
            {
                name: 'South Africa',
                ranking: 4,
                captain: 'Temba Bavuma',
                coach: 'Rob Walter',
                image: 'https://resources.pulse.icc-cricket.com/teams/flags/test/3.png',
                stats: {
                    matches: 135,
                    wins: 75,
                    losses: 55,
                    draws: 5
                }
            }
        ];
        
        displayTeams(teams);
    }, 1000);
}

function displayTeams(teams) {
    let html = '';
    
    teams.forEach(team => {
        html += `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="team-card fade-in">
                    <div class="team-header">
                        <i class="fas fa-cricket fa-3x"></i>
                        <h3 class="team-name">${team.name}</h3>
                        <span class="badge bg-primary">Rank #${team.ranking}</span>
                    </div>
                    <div class="team-content">
                        <div class="team-info">
                            <p><strong>Captain:</strong> ${team.captain}</p>
                            <p><strong>Coach:</strong> ${team.coach}</p>
                        </div>
                        <div class="team-stats">
                            <div class="stat">
                                <span class="stat-value">${team.stats.matches}</span>
                                <span class="stat-label">Matches</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${team.stats.wins}</span>
                                <span class="stat-label">Wins</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${team.stats.losses}</span>
                                <span class="stat-label">Losses</span>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100 mt-3" onclick="viewTeamDetails('${team.name}')">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#teams-container').html(html);
}

function handleTeamSearch() {
    $('#teamSearch').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $('.team-card').each(function() {
            const teamName = $(this).find('.team-name').text().toLowerCase();
            $(this).closest('.col-md-6').toggle(teamName.includes(searchTerm));
        });
    });
}

function viewTeamDetails(teamName) {
    // In a real app, this would navigate to a team details page
    showNotification(`Viewing details for ${teamName}`, 'info');
}

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
        
        // Simulate API call
        setTimeout(() => {
            // Check credentials (in real app, this would be a server call)
            if (email === 'test@example.com' && password === 'password') {
                // Store user session
                const userData = { email, rememberMe };
                if (rememberMe) {
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(userData));
                }
                
                // Show success message
                showNotification('Successfully logged in!', 'success');
                
                // Close modal and redirect
                $('#loginModal').modal('hide');
                window.location.href = 'dashboard.html';
            } else {
                showNotification('Invalid email or password', 'error');
            }
            
            // Reset button state
            submitBtn.prop('disabled', false).text(originalText);
        }, 1500);
    });
}

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
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would be a server call
            showNotification('Registration successful! Please login.', 'success');
            
            // Reset form and close modal
            $(this).trigger('reset');
            $('#registerModal').modal('hide');
            
            // Reset button state
            submitBtn.prop('disabled', false).text(originalText);
        }, 1500);
    });
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (user) {
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

function logout() {
    // Clear user data
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
    // Show notification
    showNotification('Successfully logged out', 'success');
    
    // Reload page
    window.location.reload();
}

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