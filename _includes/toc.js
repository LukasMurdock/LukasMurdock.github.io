function useState(initialState) {
    let state = initialState;

    function getState() {
        return state;
    }

    function setState(newState) {
        state = newState;
    }

    return [getState, setState];
}

const [currentHeading, setCurrentHeading] = useState(null);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setCurrentHeading(entry.target.id)
        }
    });
});

const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
headings.forEach((heading) => {
    // observe each heading
    observer.observe(heading);
});

// Clone table of contents

const clonedTableOfContents = document.getElementById('markdown-toc').cloneNode(true);
  // Create a button element to toggle the drawer
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Table of Contents';
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '20px';
toggleButton.style.right = '20px';
toggleButton.style.zIndex = '9999';

// Create a div element to hold the cloned table of contents
const drawer = document.createElement('div');
drawer.style.display = 'none';
drawer.style.position = 'fixed';
drawer.style.bottom = '80px';
drawer.style.right = '20px';
drawer.style.width = '300px';
drawer.style.maxHeight = '70vh';
drawer.style.overflowY = 'auto';
drawer.style.padding = '10px';
drawer.style.background = '#fff';
drawer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
drawer.style.zIndex = '9999';
drawer.appendChild(clonedTableOfContents);

// Add an event listener to the toggle button to show/hide the drawer
toggleButton.addEventListener('click', () => {
    if (drawer.style.display === 'none') {
        drawer.style.display = 'block';

        // Get all elements with class 'active' and remove it
        const activeElements = document.getElementsByClassName('active');
        for (let i = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove('active');
        }

        // scroll to current headingId in drawer
        const currentHeadingId = currentHeading();
        if (currentHeadingId) {
            const currentHeadingElement = drawer.querySelector(`#${currentHeadingId}`);
            if (currentHeadingElement) {
                currentHeadingElement.scrollIntoView({
                    behavior: 'smooth',
                });
                // add 3px black underline and yellow background
                currentHeadingElement.style.textDecoration = 'underline 3px black';
                currentHeadingElement.style.background = '#FFDD00';
                // add 'active' class
                currentHeadingElement.classList.add('active');


            }
        }
    } else {
        drawer.style.display = 'none';
    }
});

// Add the toggle button and drawer to the document
document.body.appendChild(toggleButton);
document.body.appendChild(drawer);
