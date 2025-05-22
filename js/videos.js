$(document).ready(function() {
    // Initialize components
    initializeComponents();
    
    // Load videos
    loadVideos();
    
    // Setup video filters
    setupVideoFilters();
});

function initializeComponents() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();
}

function loadVideos() {
    // Show loading spinner
    $('#videos-container').html('<div class="col-12 text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
    
    // Simulate API call to get videos
    setTimeout(() => {
        const videos = [
            {
                id: 'video1',
                title: 'India vs Australia: Day 1 Highlights',
                category: 'Highlights',
                date: 'March 10, 2024',
                thumbnail: 'images/videos/india-aus-day1.jpg',
                duration: '10:30',
                views: '1.2M'
            },
            {
                id: 'video2',
                title: 'Virat Kohli Post-Match Interview',
                category: 'Interviews',
                date: 'March 9, 2024',
                thumbnail: 'images/videos/kohli-interview.jpg',
                duration: '5:45',
                views: '850K'
            },
            {
                id: 'video3',
                title: 'Match Analysis: England vs South Africa',
                category: 'Analysis',
                date: 'March 8, 2024',
                thumbnail: 'images/videos/eng-sa-analysis.jpg',
                duration: '15:20',
                views: '650K'
            },
            {
                id: 'video4',
                title: 'New Zealand vs Pakistan: Series Review',
                category: 'Highlights',
                date: 'March 7, 2024',
                thumbnail: 'images/videos/nz-pak-review.jpg',
                duration: '12:15',
                views: '450K'
            },
            {
                id: 'video5',
                title: 'Steve Smith Batting Masterclass',
                category: 'Analysis',
                date: 'March 6, 2024',
                thumbnail: 'images/videos/smith-masterclass.jpg',
                duration: '8:45',
                views: '750K'
            },
            {
                id: 'video6',
                title: 'West Indies Squad Announcement',
                category: 'Interviews',
                date: 'March 5, 2024',
                thumbnail: 'images/videos/wi-squad.jpg',
                duration: '7:30',
                views: '320K'
            }
        ];
        
        displayVideos(videos);
    }, 1000);
}

function displayVideos(videos) {
    const container = $('#videos-container');
    container.empty();
    
    videos.forEach(video => {
        const videoCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <div class="placeholder-image">
                            <i class="fas fa-cricket fa-5x"></i>
                        </div>
                        <span class="position-absolute bottom-0 end-0 bg-dark text-white p-2 m-2 rounded">
                            ${video.duration}
                        </span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <p class="card-text">
                            <small class="text-muted">${video.date}</small>
                            <span class="float-end">
                                <i class="fas fa-eye"></i> ${video.views}
                            </span>
                        </p>
                        <span class="badge bg-primary">${video.category}</span>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100" onclick="playVideo('${video.id}')">
                            <i class="fas fa-play"></i> Watch Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.append(videoCard);
    });
}

function setupVideoFilters() {
    $('.video-filters .btn').click(function() {
        // Remove active class from all buttons
        $('.video-filters .btn').removeClass('active btn-primary').addClass('btn-outline-primary');
        
        // Add active class to clicked button
        $(this).removeClass('btn-outline-primary').addClass('active btn-primary');
        
        // Get selected category
        const category = $(this).text();
        
        // Filter videos
        if (category === 'All Videos') {
            loadVideos();
        } else {
            filterVideos(category);
        }
    });
}

function filterVideos(category) {
    // Show loading spinner
    $('#videos-container').html('<div class="col-12 text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
    
    // Simulate API call to get filtered videos
    setTimeout(() => {
        // In a real application, this would be an API call with the category filter
        loadVideos();
    }, 500);
}

function playVideo(videoId) {
    // In a real application, this would open the video player with the selected video
    console.log(`Playing video: ${videoId}`);
    
    // For demo purposes, show an alert
    alert('Video player would open here in the actual application.');
}

// Handle login form submission
$('#loginForm').submit(function(e) {
    e.preventDefault();
    
    const email = $('#email').val();
    const password = $('#password').val();
    
    // In a real application, this would be an API call to authenticate the user
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, show a success message
    alert('Login functionality would be implemented here in the actual application.');
    
    // Close the modal
    $('#loginModal').modal('hide');
}); 