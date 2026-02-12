// Funkce pro přepínání stránek
function showPage(pageId, element) {
    // Skryje všechny stránky
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Zobrazí tu správnou
    document.getElementById(pageId).classList.add('active');

    // Aktivuje ikonu v menu
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-nav'));
    element.classList.add('active-nav');

    // Zastaví videa, pokud nejsme na video stránce
    if (pageId !== 'video-page') {
        document.querySelectorAll('video').forEach(v => v.pause());
    }
}

// Automatické přehrávání videí při scrollování (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (entry.isIntersecting) {
            video.play().catch(e => console.log("Auto-play blocked"));
        } else {
            video.pause();
        }
    });
}, { threshold: 0.7 });

// Spustíme sledování všech video kontejnerů
document.querySelectorAll('.video-container').forEach(container => {
    observer.observe(container);
    
    // Kliknutí na video pro pauzu/start
    const v = container.querySelector('video');
    v.addEventListener('click', () => {
        if (v.paused) v.play();
        else v.pause();
    });
});
