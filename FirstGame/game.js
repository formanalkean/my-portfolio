// Select the frog element
const frog = document.querySelector('.frog');
const game = document.getElementById('game');

// Set initial frog position
let frogPosition = { x: 180, y: 460 }; // Bottom center

// Function to handle key presses to move the frog
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (frogPosition.y > 0) frogPosition.y -= 50;
            break;
        case 'ArrowDown':
            if (frogPosition.y < 460) frogPosition.y += 50;
            break;
        case 'ArrowLeft':
            if (frogPosition.x > 0) frogPosition.x -= 40;
            break;
        case 'ArrowRight':
            if (frogPosition.x < 360) frogPosition.x += 40;
            break;
    }
    updateFrogPosition();
    checkCollisions();
    checkWin();
});

// Update the frog's position on the screen
function updateFrogPosition() {
    frog.style.left = `${frogPosition.x}px`;
    frog.style.top = `${frogPosition.y}px`;
}

// Function to create obstacles (cars and logs)
function createObstacle(type, lane, speed) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle', type);
    obstacle.style.top = `${lane}px`;
    obstacle.style.left = `${Math.random() * 350}px`; // Random initial position
    obstacle.dataset.speed = speed;
    game.appendChild(obstacle);
}

// Move obstacles across the screen
function moveObstacles() {
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => {
        let position = parseFloat(obstacle.style.left);
        position += parseFloat(obstacle.dataset.speed);
        if (position > 400) position = -50; // Loop back to the left side
        obstacle.style.left = `${position}px`;
    });
}

// Collision detection
function checkCollisions() {
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const frogRect = frog.getBoundingClientRect();
        
        if (
            frogRect.left < obstacleRect.right &&
            frogRect.right > obstacleRect.left &&
            frogRect.top < obstacleRect.bottom &&
            frogRect.bottom > obstacleRect.top
        ) {
            resetGame(); // Collision detected
        }
    });
}

// Check if the frog reaches the goal
function checkWin() {
    if (frogPosition.y <= 50) {
        alert('You Win!');
        resetGame();
    }
}

// Reset the game
function resetGame() {
    frogPosition = { x: 180, y: 460 };
    updateFrogPosition();
}

// Spawn obstacles at intervals
setInterval(() => {
    createObstacle('car', 400, -2);
    createObstacle('car', 350, 3);
}, 2000);

// Move obstacles every 20ms
setInterval(moveObstacles, 20);
