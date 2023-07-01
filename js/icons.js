function setIcons() {
    const linkIcons = document.querySelectorAll('[data-link-icon]');
    for (let i = 0; i < linkIcons.length; i++) {
        const linkIconEl = linkIcons[i];
        const iconName = linkIconEl.getAttribute('data-link-icon');
        const iconType = linkIconEl.getAttribute('data-link-icon-type');
        if (iconType === 'svg') {
            linkIconEl.style.setProperty('--link-icon-url', `url(/images/icons/${iconName}.svg)`);
        } else {
            linkIconEl.style.setProperty('--link-icon', `"${iconName}"`);
        }
    }
}

window.addEventListener('load', setIcons);
