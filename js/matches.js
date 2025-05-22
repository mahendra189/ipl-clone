// Wait for the document to be ready
$(document).ready(function() {
    // Initialize components
    initializeComponents();
    
    // Load live matches
    loadLiveMatches();
    
    // Load upcoming matches
    loadUpcomingMatches();
    
    // Initialize match filters
    initializeMatchFilters();
    
    // Initialize calendar
    initializeCalendar();
});

// Initialize components
function initializeComponents() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();
}

// Load live matches
function loadLiveMatches() {
    // Show loading spinner
    $('#live-matches-container').html('<div class="text-center"><div class="spinner"></div></div>');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        const matches = [
            {
                team1: 'India',
                team2: 'Australia',
                score1: '285/4',
                score2: '280/8',
                status: 'Live',
                venue: 'Melbourne Cricket Ground',
                overs: '45.2',
                currentBatsmen: ['Kohli', 'Rahul'],
                currentBowlers: ['Starc']
            },
            {
                team1: 'England',
                team2: 'South Africa',
                score1: '320/6',
                score2: '315/9',
                status: 'Live',
                venue: 'Lord\'s Cricket Ground',
                overs: '48.5',
                currentBatsmen: ['Root', 'Stokes'],
                currentBowlers: ['Rabada']
            }
        ];
        
        displayLiveMatches(matches);
    }, 1000);
}

// Display live matches
function displayLiveMatches(matches) {
    let html = '';
    
    matches.forEach(match => {
        html += `
            <div class="col-md-6">
                <div class="match-card p-3 fade-in">
                    <div class="match-header d-flex justify-content-between align-items-center mb-3">
                        <span class="badge bg-danger">LIVE</span>
                        <small class="text-muted">${match.overs} overs</small>
                    </div>
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
                    <div class="d-flex justify-content-between align-items-center mb-3">
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
                    <div class="match-details">
                        <div class="current-players">
                            <p class="mb-1"><strong>Batting:</strong> ${match.currentBatsmen.join(', ')}</p>
                            <p class="mb-1"><strong>Bowling:</strong> ${match.currentBowlers.join(', ')}</p>
                        </div>
                        <small class="text-muted">${match.venue}</small>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#live-matches-container').html(html);
}

// Load upcoming matches
function loadUpcomingMatches() {
    // Show loading spinner
    $('#upcoming-matches-container').html('<div class="text-center"><div class="spinner"></div></div>');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        const matches = [
            {
                team1: 'New Zealand',
                team2: 'Pakistan',
                date: '2024-03-15',
                time: '14:00',
                venue: 'Eden Park',
                series: 'World Test Championship'
            },
            {
                team1: 'West Indies',
                team2: 'Sri Lanka',
                date: '2024-03-18',
                time: '10:30',
                venue: 'Kensington Oval',
                series: 'ODI Series'
            }
        ];
        
        displayUpcomingMatches(matches);
    }, 1000);
}

// Display upcoming matches
function displayUpcomingMatches(matches) {
    let html = '';
    
    matches.forEach(match => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="match-card p-3 fade-in">
                    <div class="match-header d-flex justify-content-between align-items-center mb-3">
                        <span class="badge bg-info">UPCOMING</span>
                        <small class="text-muted">${match.series}</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="team">
                            <div class="placeholder-image">
                                <i class="fas fa-cricket fa-5x"></i>
                            </div>
                            <span>${match.team1}</span>
                        </div>
                        <div class="vs">VS</div>
                        <div class="team">
                            <div class="placeholder-image">
                                <i class="fas fa-cricket fa-5x"></i>
                            </div>
                            <span>${match.team2}</span>
                        </div>
                    </div>
                    <div class="match-details">
                        <p class="mb-1"><i class="far fa-calendar"></i> ${match.date}</p>
                        <p class="mb-1"><i class="far fa-clock"></i> ${match.time}</p>
                        <small class="text-muted">${match.venue}</small>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#upcoming-matches-container').html(html);
}

// Initialize match filters
function initializeMatchFilters() {
    $('.match-filters .btn').on('click', function() {
        $('.match-filters .btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter matches based on selection
        const filter = $(this).text().toLowerCase();
        filterMatches(filter);
    });
}

// Filter matches
function filterMatches(filter) {
    // Implementation for filtering matches
    console.log(`Filtering matches by: ${filter}`);
}

// Initialize calendar
function initializeCalendar() {
    // Implementation for calendar
    console.log('Calendar initialized');
} 