document.addEventListener("DOMContentLoaded", function() {
    // Cache DOM elements
    const galleryRow = document.querySelector('.gallery-row');
    const staffCountElement = document.querySelector('.staff-count');

    // Loading indicator
    const createLoadingIndicator = () => {
        const loader = document.createElement('div');
        loader.className = 'staff-loader text-center py-5';
        loader.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading staff...</p>
        `;
        return loader;
    };

    // Function to fetch staff list via AJAX
    const fetchStaffList = (params = {}, pageData = {}) => {
        // Show loading indicator
        if (galleryRow) {
            galleryRow.innerHTML = '';
            galleryRow.appendChild(createLoadingIndicator());
        }

        // Use relative URL to work with any domain including local development domains
        const url = new URL('index.php', window.location.origin);

        // Set the required parameters for the AJAX endpoint
        url.searchParams.set('namespace', 'pages');
        url.searchParams.set('ajax_action', 'staff_list');

        // Add all current URL parameters except page and page_id
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.forEach((value, key) => {
            if (key !== 'namespace' && key !== 'ajax_action' && key !== 'page' && key !== 'page_id') {
                url.searchParams.set(key, value);
            }
        });

        // Override with any new parameters
        Object.keys(params).forEach(key => {
            // If the value is empty, delete the parameter instead of setting it
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, params[key]);
            }
        });

        console.log('Fetching staff list from:', url.toString());

        // Create request options with page data in the body
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(pageData)
        };

        // Fetch the staff list
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success' && galleryRow) {
                    // Update gallery with new HTML
                    galleryRow.innerHTML = data.html;

                    // Update staff count if available
                    if (staffCountElement) {
                        staffCountElement.textContent = data.staff_count;
                    }

                    // Update browser URL without reloading the page
                    const newUrl = new URL(window.location.href);

                    // Handle parameters in the browser URL
                    Object.keys(params).forEach(key => {
                        if (params[key] === '' || params[key] === null || params[key] === undefined) {
                            newUrl.searchParams.delete(key);
                        } else {
                            newUrl.searchParams.set(key, params[key]);
                        }
                    });

                    // Remove page and page_id from URL if they exist
                    newUrl.searchParams.delete('page');
                    newUrl.searchParams.delete('page_id');

                    window.history.pushState({}, '', newUrl);

                    // Initialize any lazy loading or other scripts
                    initializeLazyLoading();
                } else {
                    console.error('Error in response data:', data);
                    galleryRow.innerHTML = '<div class="col-12 text-center py-5"><p>Error loading staff. Please try again.</p></div>';
                }
            })
            .catch(error => {
                console.error('Error fetching staff list:', error);
                if (galleryRow) {
                    galleryRow.innerHTML = '<div class="col-12 text-center py-5"><p>Error loading staff. Please try again.</p></div>';
                }
            });
    };

    // Initialize lazy loading for images
    const initializeLazyLoading = () => {
        const lazyImages = document.querySelectorAll('.gallery-row img[data-src]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    };

    // Listen for filter-change events from filter.js
    document.addEventListener('filter-change', function(event) {
        const {
            param,
            value,
            pageData
        } = event.detail;
        fetchStaffList({
            [param]: value
        }, pageData);
    });

    // Listen for filter-reset events from filter.js
    document.addEventListener('filter-reset', function(event) {
        // Get page data if available
        const pageData = event.detail ? .pageData || {};

        // Clear all URL parameters and fetch staff list without filters
        const cleanParams = {};

        // Get all current URL parameters
        const currentParams = new URLSearchParams(window.location.search);

        // Remove all filter-related parameters
        currentParams.forEach((_, key) => {
            if (key !== 'namespace' && key !== 'ajax_action') {
                cleanParams[key] = '';
            }
        });

        // Update URL and fetch staff without filters, but keep page data
        window.history.pushState({}, '', window.location.pathname);
        fetchStaffList(cleanParams, pageData);
    });

    // Initialize any existing lazy loading
    initializeLazyLoading();
});