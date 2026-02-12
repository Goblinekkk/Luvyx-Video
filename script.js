function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-nav'));
    element.classList.add('active-nav');

    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(v => v.pause());

    if (pageId === 'video-page') {
        const firstVideo = document.querySelector('#video-page video');
        if(firstVideo) firstVideo.play();
    }
}

// Oprava lajků
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const countSpan = this.querySelector('.count');
        let count = parseInt(countSpan.innerText);

        if (this.classList.contains('liked')) {
            this.classList.remove('liked');
            this.style.color = "white";
            countSpan.innerText = count - 1;
        } else {
            this.classList.add('liked');
            this.style.color = "#ff4d4d";
            countSpan.innerText = count + 1;
        }
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        const v = e.target.querySelector('video');
        if (e.isIntersecting) {
            v.play();
        } else {
            v.pause();
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.video-container').forEach(c => observer.observe(c));

document.querySelectorAll('video').forEach(v => {
    v.addEventListener('click', () => {
        v.paused ? v.play() : v.pause();
    });
});
