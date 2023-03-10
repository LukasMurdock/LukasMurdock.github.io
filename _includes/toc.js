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
            // setCurrentHeading()
            console.log(entry)
        }
    });
});

const headings = Array.from(document.querySelectorAll('h1, h2, h3'));

// Create table of contents div
const mainEl = document.querySelector('main');
const tocDiv = document.createElement('div');
const tocUl = document.createElement('ul');
tocDiv.appendChild(tocUl);
divEl.setAttribute('id', 'table-of-contents');
mainEl.insertBefore(tocDiv, mainEl.firstChild);

headings.forEach((heading) => {
    // observe each heading
    observer.observe(heading);
    // add to Table of Contents
    const level = parseInt(heading.tagName.substring(1), 10);
    if (level === 1) {

    }
});
