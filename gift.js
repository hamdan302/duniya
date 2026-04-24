// --- Configuration placeholders ---
// Replace this date with your actual relationship start date
const START_DATE = "2026-03-22T00:00:00"; 

// --- Intersection Observer for Scroll Animations ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// --- Modal Logic ---
const modal = document.getElementById('surpriseModal');
const surpriseBtn = document.getElementById('surpriseBtn');
const closeModal = document.getElementById('closeModal');
const heartsContainer = document.getElementById('heartsContainer');

surpriseBtn.addEventListener('click', () => {
    modal.classList.add('active');
    createHearts();
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    heartsContainer.innerHTML = ''; // clear hearts
});

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        heartsContainer.innerHTML = '';
    }
});

function createHearts() {
    // Generate some initial hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(spawnHeart, i * 200);
    }
}

function spawnHeart() {
    if (!modal.classList.contains('active')) return;
    
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation ends
    setTimeout(() => {
        heart.remove();
        if (modal.classList.contains('active')) spawnHeart();
    }, 5000);
}


// --- Time Together Counter ---
function updateCounter() {
    const startDate = new Date(START_DATE).getTime();
    const now = new Date().getTime();
    const difference = now - startDate;

    if (difference < 0) return; // Ignore future dates

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

// Initial call and set interval
updateCounter();
setInterval(updateCounter, 1000);


// --- Audio Toggle ---
const audioToggle = document.getElementById('audioToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        audioToggle.innerText = '🎵';
    } else {
        bgMusic.play();
        audioToggle.innerText = '⏸️';
    }
    isPlaying = !isPlaying;
});
