const routes = {
    '/': Index
};

function loadPage() {
    const hash = location.hash.replace(/^#/, '');

    try {
        const page = new routes[hash];
        console.log(page);
        page.renderPage();
    } catch(e) {
        console.error('Page introuvable')
    }
}

window.addEventListener('haschange' , loadPage);
