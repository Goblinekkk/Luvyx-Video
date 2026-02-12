function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-nav'));
    element.classList.add('active-nav');

    if (pageId !== 'video-page') {
        document.querySelectorAll('video').forEach(v => v.pause());
    }
}

// Funkce pro Like
function likeVideo(btn) {
    btn.style.transform = "scale(1.3)";
    setTimeout(() => btn.style.transform = "scale(1)", 200);
    
    let countSpan = btn.querySelector('.count');
    let currentLikes = parseInt(countSpan.innerText);
    countSpan.innerText = currentLikes + 1;
    btn.style.color = "#ff4d4d";
}

// Funkce pro Sdílení
function shareVideo() {
    if (navigator.share) {
        navigator.share({
            title: 'Luvyx Video',
            url: window.location.href
        });
    } else {
        alert("Odkaz zkopírován do schránky!");
    }
}

// Intersection Observer pro automatické přehrávání
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        const v = e.target.querySelector('video');
        if (e.isIntersecting) v.play();
        else v.pause();
    });
}, { threshold: 0.8 });

document.querySelectorAll('.video-container').forEach(c => obs.observe(c));
