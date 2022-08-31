const gameContainer = document.getElementById('game-container');
const loginContainer = document.getElementById('login-container');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const TILE_SIZE = 96;

const MAP_WIDTH = WIDTH / TILE_SIZE;
const MAP_HEIGHT = HEIGHT / TILE_SIZE;

const tiles = [];

const playerX = 0; // Kordynanty X początkowe gracza
const playerY = 0; // Kordynanty Y początkowe gracza

// Grass = 0;
// Wall = 1;

const createImage = path => { // Funkcja tworzenia obrazu
  const image = document.createElement('img');
  image.src = `images/${path}.png`;
  return image;
}

const playerImg = createImage('player');

const tileNames = [
  'grass', 'wall',
];

const tileImages = [];

const joinGame = () => { // Dołączanie do gry
  document.body.style.backgroundColor = '#121212';

  gameContainer.style.display = 'block';
  loginContainer.style.display = 'none';

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

const draw = () => { // Funkcja rysowania
  requestAnimationFrame(draw);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const xOffset = WIDTH / 2 - TILE_SIZE / 2;
  const yOffset = HEIGHT / 2 - TILE_SIZE / 2;

  // Renderowanie kafelków
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const tile = tiles[x][y];

      const tileX = xOffset + tile.xPos * TILE_SIZE;
      const tileY = yOffset + tile.yPos * TILE_SIZE;

      ctx.drawImage(tileImages[tile.type], tileX, tileY);
    }
  }

  // Renderowanie gracza
  ctx.drawImage(playerImg, xOffset + playerX, yOffset + playerY);
}

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}