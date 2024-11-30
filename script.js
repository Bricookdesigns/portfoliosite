document.addEventListener('DOMContentLoaded', () => {
    // Ensure the scrolling message starts immediately and begins scrolling.
    const scrollingMessage = document.querySelector('.scrolling-message');
    if (scrollingMessage) {
        // Add the 'visible' class for the scrolling message to ensure it shows up right away
        scrollingMessage.classList.add('visible');
        // Trigger the scrolling immediately without waiting for fade-in effects
        startScrollingMessage(scrollingMessage);
    }
    
    // Other JavaScript logic for smooth scroll...
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Get the target section based on the data attribute
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            // Smoothly scroll to the target section
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            }

        });
    });

    // Intersection observer for fade-in effects (not affecting the scrolling message)
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => {
        // Exclude scrolling message from fade-in logic
        if (!elem.classList.contains('scrolling-message')) {
            observer.observe(elem);
        }
    });
});

// Function to handle the scrolling animation of the scrolling message
function startScrollingMessage(element) {
    let scrollAmount = 0;
    const scrollSpeed = 1; // Adjust the speed of scrolling
    
    // Reset the position of the scrolling message to start at the beginning
    element.style.transform = `translateX(100%)`;
    
    function scroll() {
        if (scrollAmount > -element.offsetWidth) {
            scrollAmount -= scrollSpeed;
            element.style.transform = `translateX(${scrollAmount}px)`;
            requestAnimationFrame(scroll);
        } else {
            // Restart the scrolling from the beginning
            scrollAmount = window.innerWidth; // Start from the right side again
            scroll();
        }
    }
    
    scroll(); // Start the scrolling
}


function toggleCard(button) {
    var card = button.closest('.card'); // Find the closest card element
    var list = card.querySelector('.project-list'); // Get the unordered list

    // Toggle visibility of the list and expand the card
    if (list.style.display === '' || list.style.display === 'none') {
        list.style.display = 'block';  // Show the list
        card.classList.add('expanded');  // Expand the card

        // Scroll the page to bring the expanded card into view
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        list.style.display = 'none';  // Hide the list
        card.classList.remove('expanded');  // Collapse the card
    }
}
