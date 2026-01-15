const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
  x: 175,
  y: 500,
  width: 50,
  height: 80,
  speed: 50
};

let enemies = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  }
  if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}

function createEnemy() {
  let x = Math.random() * (canvas.width - 50);
  enemies.push({ x, y: -80, width: 50, height: 80, speed: 5 });
}

function updateEnemies() {
  enemies.forEach(enemy => {
    enemy.y += enemy.speed;

    if (collision(player, enemy)) {
      gameOver = true;
    }
  });

  enemies = enemies.filter(e => e.y < canvas.height);
}

function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function drawCar(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCar(player.x, player.y, player.width, player.height, "lime");

  enemies.forEach(e =>
    drawCar(e.x, e.y, e.width, e.height, "red")
  );

  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 110, 300);
    ctx.font = "18px Arial";
    ctx.fillText("Refresh to Restart", 125, 340);
    return;
  }

  score++;
  updateEnemies();
  draw();
  requestAnimationFrame(gameLoop);
}

setInterval(createEnemy, 1000);
gameLoop();
