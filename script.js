// Function to create floating hearts in the background
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '💕', '💓', '💗'];
    
    // Create a new heart every 400ms
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomize heart properties
        const randomHeart = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        const leftPos = Math.random() * 100; // 0 to 100vw
        const animationDuration = 5 + Math.random() * 10; // 5s to 15s
        const fontSize = 10 + Math.random() * 20; // 10px to 30px
        
        heart.innerText = randomHeart;
        heart.style.left = `${leftPos}%`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.fontSize = `${fontSize}px`;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation finishes to prevent DOM buildup
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
    }, 400);
}

// Initialize hearts on load
window.onload = createHearts;

// Function to handle the button click
function showLove() {
    const messageSection = document.getElementById("messageSection");
    const btn = document.getElementById("revealBtn");
    
    // Add the reveal class to trigger CSS transitions
    messageSection.classList.add("reveal");
    
    // Update button text and style
    btn.innerHTML = "I Love You! 🥰";
    btn.style.background = "linear-gradient(45deg, #c9184a, #ff4d6d)";
    
    // Add a burst of little stars/hearts from the button click position
    for(let i=0; i<15; i++) {
        setTimeout(() => createBurstHeart(), i * 50);
    }
}

function createBurstHeart() {
    const heartsContainer = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '✨';
    
    // Start from center
    heart.style.left = '50%';
    heart.style.bottom = '40%';
    heart.style.fontSize = '24px';
    heart.style.animation = `burst 1.5s ease-out forwards`;
    
    // Random direction
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200 - 100;
    
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--ty', `${ty}px`);
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1500);
}
