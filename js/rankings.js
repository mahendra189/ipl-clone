// Wait for the document to be ready
$(document).ready(function() {
    // Initialize components
    initializeComponents();
    
    // Load team rankings
    loadTeamRankings();
    
    // Load player rankings
    loadPlayerRankings();
    
    // Initialize ranking filters
    initializeRankingFilters();
});

// Initialize components
function initializeComponents() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();
}

// Load team rankings
function loadTeamRankings() {
    // Show loading spinner
    $('#team-rankings-container').html('<tr><td colspan="5" class="text-center"><div class="spinner"></div></td></tr>');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        const teams = [
            {
                rank: 1,
                team: 'India',
                rating: 121,
                points: 2914,
                matches: 24
            },
            {
                rank: 2,
                team: 'Australia',
                rating: 117,
                points: 2808,
                matches: 24
            },
            {
                rank: 3,
                team: 'England',
                rating: 115,
                points: 2760,
                matches: 24
            },
            {
                rank: 4,
                team: 'South Africa',
                rating: 104,
                points: 2496,
                matches: 24
            },
            {
                rank: 5,
                team: 'New Zealand',
                rating: 100,
                points: 2400,
                matches: 24
            }
        ];
        
        displayTeamRankings(teams);
    }, 1000);
}

// Display team rankings
function displayTeamRankings(teams) {
    let html = '';
    
    teams.forEach(team => {
        html += `
            <tr>
                <td>${team.rank}</td>
                <td>
                    <div class="placeholder-image">
                        <i class="fas fa-cricket fa-5x"></i>
                    </div>
                </td>
                <td>${team.rating}</td>
                <td>${team.points}</td>
                <td>${team.matches}</td>
            </tr>
        `;
    });
    
    $('#team-rankings-container').html(html);
}

// Load player rankings
function loadPlayerRankings() {
    // Show loading spinner for batsmen
    $('#batsmen-rankings-container').html('<tr><td colspan="4" class="text-center"><div class="spinner"></div></td></tr>');
    
    // Show loading spinner for bowlers
    $('#bowlers-rankings-container').html('<tr><td colspan="4" class="text-center"><div class="spinner"></div></td></tr>');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        const batsmen = [
            {
                rank: 1,
                player: 'Virat Kohli',
                team: 'India',
                rating: 870
            },
            {
                rank: 2,
                player: 'Steve Smith',
                team: 'Australia',
                rating: 850
            },
            {
                rank: 3,
                player: 'Kane Williamson',
                team: 'New Zealand',
                rating: 830
            }
        ];
        
        const bowlers = [
            {
                rank: 1,
                player: 'Pat Cummins',
                team: 'Australia',
                rating: 890
            },
            {
                rank: 2,
                player: 'Jasprit Bumrah',
                team: 'India',
                rating: 880
            },
            {
                rank: 3,
                player: 'Kagiso Rabada',
                team: 'South Africa',
                rating: 870
            }
        ];
        
        displayPlayerRankings(batsmen, bowlers);
    }, 1000);
}

// Display player rankings
function displayPlayerRankings(batsmen, bowlers) {
    let batsmenHtml = '';
    let bowlersHtml = '';
    
    // Display batsmen rankings
    batsmen.forEach(player => {
        batsmenHtml += `
            <tr>
                <td>${player.rank}</td>
                <td>${player.player}</td>
                <td>
                    <div class="placeholder-image">
                        <i class="fas fa-cricket fa-5x"></i>
                    </div>
                </td>
                <td>${player.rating}</td>
            </tr>
        `;
    });
    
    // Display bowlers rankings
    bowlers.forEach(player => {
        bowlersHtml += `
            <tr>
                <td>${player.rank}</td>
                <td>${player.player}</td>
                <td>
                    <div class="placeholder-image">
                        <i class="fas fa-cricket fa-5x"></i>
                    </div>
                </td>
                <td>${player.rating}</td>
            </tr>
        `;
    });
    
    $('#batsmen-rankings-container').html(batsmenHtml);
    $('#bowlers-rankings-container').html(bowlersHtml);
}

// Initialize ranking filters
function initializeRankingFilters() {
    $('.ranking-filters .btn').on('click', function() {
        $('.ranking-filters .btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter rankings based on selection
        const filter = $(this).text().toLowerCase();
        filterRankings(filter);
    });
}

// Filter rankings
function filterRankings(filter) {
    // Implementation for filtering rankings
    console.log(`Filtering rankings by: ${filter}`);
} 