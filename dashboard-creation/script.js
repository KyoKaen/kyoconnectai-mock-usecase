document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-left ul li a');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const contentContainer = document.getElementById('tab-content-container');

    const fetchLinksBtn = document.getElementById('fetchLinksBtn');
    const loadSitemapBtn = document.getElementById('loadSitemapBtn');
    const crawlUrlInput = document.getElementById('crawl-url');
    const sitemapUrlInput = document.getElementById('sitemap-url');
    // Get references to the error message divs
    const crawlUrlError = document.getElementById('crawl-url-error');
    const sitemapUrlError = document.getElementById('sitemap-url-error');


    // --- Tab Switching Logic (remains the same) ---
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetTab = link.getAttribute('data-tab');

            // Update active link
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');

            // Hide all panes
            contentContainer.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.add('hidden');
                pane.classList.remove('active');
            });

             // Show the target pane
            const targetPane = document.getElementById(`${targetTab}-content`);
            if (targetPane) {
                targetPane.classList.remove('hidden');
                targetPane.classList.add('active');
            } else {
                console.error(`Tab content not found for: ${targetTab}-content`);
            }
        });
    });

    // --- Website Tab Button Logic ---

    // Basic URL validation function (check format)
    function isValidUrlFormat(string) {
        // Simple check: Requires http:// or https:// followed by something
        // More robust regex can be used if needed.
        const pattern = new RegExp('^https?:\\/\\/.+', 'i');
        return !!pattern.test(string);

        /* Alternative using URL constructor (stricter, might fail on partial URLs)
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
        */
    }

    // Updated validation function: Takes input element and error display element
    function validateInput(inputElement, errorElement) {
        const url = inputElement.value.trim();

        // Clear previous errors
        inputElement.classList.remove('error');
        errorElement.classList.add('hidden'); // Hide error message initially
        errorElement.textContent = 'Invalid URL'; // Reset text just in case

        // Check if empty
        if (!url) {
            inputElement.classList.add('error');
            // errorElement.textContent = 'URL cannot be empty'; // Or keep "Invalid URL"
            errorElement.classList.remove('hidden'); // Show error message
            inputElement.focus();
            return null; // Indicate validation failure
        }

        // Check if format is valid
        if (!isValidUrlFormat(url)) {
            inputElement.classList.add('error');
            errorElement.classList.remove('hidden'); // Show error message
            inputElement.focus();
            return null; // Indicate validation failure
        }

        // If we reach here, URL is valid
        return url; // Return the valid URL
    }


    if (fetchLinksBtn) {
        fetchLinksBtn.addEventListener('click', () => {
            // Pass both input and its error div to the validation function
            const urlToCrawl = validateInput(crawlUrlInput, crawlUrlError);

            if (urlToCrawl) {
                console.log(`Frontend: Validated URL. Ready to trigger backend crawl for: ${urlToCrawl}`);
                alert(`Simulating: Triggering backend crawl for ${urlToCrawl}`);
                // ----- !!! BACKEND INTEGRATION POINT !!! -----
                // Uncomment and adapt fetch call when ready
                /*
                fetch('/api/crawl', { ... }) ...
                */
            } else {
                 console.log('Frontend: Fetch links button clicked, but URL is invalid or empty.');
                 // No alert needed here, visual feedback is provided
            }
        });
    }

    if (loadSitemapBtn) {
        loadSitemapBtn.addEventListener('click', () => {
             // Pass both input and its error div to the validation function
             const sitemapUrl = validateInput(sitemapUrlInput, sitemapUrlError);

             if (sitemapUrl) {
                 console.log(`Frontend: Validated Sitemap URL. Ready to trigger backend processing for: ${sitemapUrl}`);
                alert(`Simulating: Triggering backend sitemap load for ${sitemapUrl}`);
                // ----- !!! BACKEND INTEGRATION POINT !!! -----
                 // Uncomment and adapt fetch call when ready
                 /*
                 fetch('/api/sitemap', { ... }) ...
                */
             } else {
                  console.log('Frontend: Load sitemap button clicked, but URL is invalid or empty.');
                  // No alert needed here, visual feedback is provided
             }
        });
    }

    // --- Optional: Make File Dropzone Clickable (remains the same) ---
     const fileDropzoneTarget = document.getElementById('fileDropzoneTarget');
     const fileInputElement = document.getElementById('fileInput');

     if (fileDropzoneTarget && fileInputElement) {
         fileDropzoneTarget.addEventListener('click', () => {
             fileInputElement.click();
         });
          fileInputElement.addEventListener('change', (event) => {
            if (event.target.files.length > 0) {
                console.log(`Files selected:`, event.target.files);
            }
         });
     }

});
