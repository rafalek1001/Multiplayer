const gameContainer = document.getElementById('game-container');
const loginContainer = document.getElementById('login-container');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const TILE_SIZE = 96;
const SPEED = 5;

const MAP_WIDTH = WIDTH / TILE_SIZE;
const MAP_HEIGHT = HEIGHT / TILE_SIZE;

const tiles = [];

let playerX = 0; // Kordynanty X początkowe gracza
let playerY = 0; // Kordynanty Y początkowe gracza

// Grass = 0;
// Wall = 1;

// Funkcja tworzenia obrazu
const createImage = path => {
  const image = document.createElement('img');
  image.src = `images/${path}.png`;
  return image;
}

const playerImg = createImage('player');

const tileNames = [
  'grass', 'wall',
];

const tileImages = [];
const keys = {};

const allTheRightMoves = {
  W: [0, -1],
  S: [0, 1],
  A: [-1, 0],
  D: [1, 0],
};

// Dołączanie do gry
const joinGame = () => {
  document.body.style.backgroundColor = '#121212';

  gameContainer.style.display = 'block';
  loginContainer.style.display = 'none';

  document.body.onkeydown = e => {
    keys[e.key.toUpperCase()] = true;
  }

  document.body.onkeyup = e => {
    keys[e.key.toUpperCase()] = false;
  }

  loadImages();
  initTiles();
  draw();
}

const loadImages = () => {
  for (let i = 0; i < tileNames.length; i++) {
    tileImages[i] = createImage(tileNames[i]);
  }
}

const initTiles = () => {
  for (let x = 0; x < MAP_WIDTH; x++) {
    tiles[x] = [];
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const tileType = getRandom(0, 1);
      tiles[x][y] = {
        xPos: x - 4,
        yPos: y - 3,
        type: tileType,
      };
    }
  }
}

// Funkcja rysowania
const draw = () => {
  requestAnimationFrame(draw);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const xOffSet = WIDTH / 2 - TILE_SIZE / 2;
  const yOffSet = HEIGHT / 2 - TILE_SIZE / 2;

  // Renderowanie kafelków
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const tile = tiles[x][y];

      const tileX = tile.xPos * TILE_SIZE - playerX + xOffSet;
      const tileY = tile.yPos * TILE_SIZE - playerY + yOffSet;

      ctx.drawImage(tileImages[tile.type], tileX, tileY);

      console.log(keys);
    }
  }

  // Renderowanie gracza
  ctx.drawImage(playerImg, xOffSet, yOffSet);

  // Poruszanie się gracza
  for (const keyOfObj in keys) {
    const playerMove = allTheRightMoves[keyOfObj];
    if (keys[keyOfObj] && playerMove) {
      playerX += playerMove[0] * SPEED;
      playerY += playerMove[1] * SPEED;
    }
  }
}

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}