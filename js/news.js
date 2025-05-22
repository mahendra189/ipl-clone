// Wait for the document to be ready
$(document).ready(function() {
    // Initialize components
    initializeComponents();
    
    // Load news articles
    loadNewsArticles();
    
    // Initialize news filters
    initializeNewsFilters();
    
    // Handle newsletter subscription
    handleNewsletterSubscription();
});

// Initialize components
function initializeComponents() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();
}

// Load news articles
function loadNewsArticles() {
    // Show loading spinner
    $('#news-container').html('<div class="text-center"><div class="spinner"></div></div>');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        const articles = [
            {
                title: 'England Announces Squad for T20 World Cup',
                category: 'Team News',
                date: 'March 10, 2024',
                image: 'images/news/england-squad.jpg',
                excerpt: 'England has announced their 15-member squad for the upcoming T20 World Cup, with several new faces making the cut.',
                author: 'John Smith'
            },
            {
                title: 'New Zealand\'s Kane Williamson Reaches 8000 Test Runs',
                category: 'Player News',
                date: 'March 9, 2024',
                image: 'images/news/williamson.jpg',
                excerpt: 'Kane Williamson becomes the fastest New Zealand batsman to reach 8000 Test runs, achieving the milestone in style.',
                author: 'Sarah Johnson'
            },
            {
                title: 'South Africa\'s Kagiso Rabada Takes 250 Test Wickets',
                category: 'Player News',
                date: 'March 8, 2024',
                image: 'images/news/rabada.jpg',
                excerpt: 'Kagiso Rabada joins an elite group of bowlers after taking his 250th Test wicket against India.',
                author: 'Mike Brown'
            },
            {
                title: 'Australia vs India Test Series Review',
                category: 'Match Reports',
                date: 'March 7, 2024',
                image: 'images/news/aus-ind.jpg',
                excerpt: 'A comprehensive review of the thrilling Test series between Australia and India.',
                author: 'David Wilson'
            }
        ];
        
        displayNewsArticles(articles);
    }, 1000);
}

// Display news articles
function displayNewsArticles(articles) {
    let html = '';
    
    articles.forEach(article => {
        html += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="placeholder-image">
                        <i class="fas fa-cricket fa-5x"></i>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${article.category}</span>
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.excerpt}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">By ${article.author}</small>
                            <small class="text-muted">${article.date}</small>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-outline-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#news-container').html(html);
}

// Initialize news filters
function initializeNewsFilters() {
    $('.news-filters .btn').on('click', function() {
        $('.news-filters .btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter news based on selection
        const filter = $(this).text().toLowerCase();
        filterNews(filter);
    });
}

// Filter news
function filterNews(filter) {
    // Implementation for filtering news
    console.log(`Filtering news by: ${filter}`);
}

// Handle newsletter subscription
function handleNewsletterSubscription() {
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subscribing...');
        
        // Simulate API call
        setTimeout(() => {
            // Reset button state
            submitBtn.html(originalText);
            
            // Show success message
            showNotification('Successfully subscribed to newsletter!', 'success');
            
            // Clear form
            $(this).find('input[type="email"]').val('');
        }, 1500);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-info';
    
    const alert = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Add notification to the page
    $('.notifications-container').append(alert);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        $('.alert').alert('close');
    }, 5000);
} 