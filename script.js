// Přepínání stránek
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-nav'));
    element.classList.add('active-nav');
    document.querySelectorAll('video').forEach(v => v.pause());
    if (pageId === 'video-page') {
        const first = document.querySelector('#video-page video');
        if(first) first.play();
    }
}

// LOGIKA PRO UKLÁDÁNÍ LAJKŮ
function loadLikes() {
    document.querySelectorAll('.video-container').forEach(container => {
        const videoId = container.getAttribute('data-id');
        const countSpan = container.querySelector('.count');
        const likeBtn = container.querySelector('.like-btn');
        
        // Načtení z paměti
        const savedLikes = localStorage.getItem(videoId + '_count') || "10"; // Základ 10 pokud není uloženo
        const isLiked = localStorage.getItem(videoId + '_status') === 'true';
        
        countSpan.innerText = savedLikes;
        if (isLiked) {
            likeBtn.style.color = "#ff4d4d";
            likeBtn.classList.add('liked');
        }
    });
}

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const container = this.closest('.video-container');
        const videoId = container.getAttribute('data-id');
        const countSpan = this.querySelector('.count');
        let count = parseInt(countSpan.innerText);

        if (this.classList.contains('liked')) {
            this.classList.remove('liked');
            this.style.color = "white";
            count -= 1;
            localStorage.setItem(videoId + '_status', 'false');
        } else {
            this.classList.add('liked');
            this.style.color = "#ff4d4d";
            count += 1;
            localStorage.setItem(videoId + '_status', 'true');
        }
        
        countSpan.innerText = count;
        localStorage.setItem(videoId + '_count', count);
    });
});

// Automatické přehrávání a načtení
window.onload = loadLikes;

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        const v = e.target.querySelector('video');
        if (e.isIntersecting) v.play();
        else v.pause();
    });
}, { threshold: 0.6 });

document.querySelectorAll('.video-container').forEach(c => observer.observe(c));

document.querySelectorAll('video').forEach(v => {
    v.addEventListener('click', () => { v.paused ? v.play() : v.pause(); });
});
