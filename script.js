const button = document.getElementById('playButton');
const audio = new Audio('assets/nun.mp3');
const counter = document.getElementById('counter');
const backgroundVideo = document.getElementById('backgroundVideo');
const resetButton = document.getElementById('resetButton');
const nunText = document.getElementById('nunText');

let count = 0;
let nextMilestone = 100;

button.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    count++;
    updateCounter();
    showNunText();

    if (count === nextMilestone) {
        playBackgroundVideo();
        nextMilestone *= 10;
    }
});

resetButton.addEventListener('click', () => {
    count = 0;
    nextMilestone = 100;
    updateCounter();
    saveCount();
    backgroundVideo.style.opacity = '0';
    backgroundVideo.pause();
    backgroundVideo.currentTime = 0;
});

function updateCounter() {
    counter.textContent = count.toString();
}

function showNunText() {
    nunText.classList.add('visible');
    setTimeout(() => {
        nunText.classList.remove('visible');
    }, 300);
}

function playBackgroundVideo() {
    backgroundVideo.style.opacity = '0.3';
    backgroundVideo.play();

    backgroundVideo.onended = () => {
        backgroundVideo.style.opacity = '0';
        backgroundVideo.currentTime = 0;
    };
}

function saveCount() {
    localStorage.setItem('nunCount', count.toString());
    localStorage.setItem('nextMilestone', nextMilestone.toString());
}

function loadCount() {
    const savedCount = localStorage.getItem('nunCount');
    const savedMilestone = localStorage.getItem('nextMilestone');
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        updateCounter();
    }
    if (savedMilestone !== null) {
        nextMilestone = parseInt(savedMilestone, 10);
    }
}

loadCount();
setInterval(saveCount, 5000);