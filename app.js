const gameContainer = document.getElementById('game-container');
const loginContainer = document.getElementById('login-container');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const playerX = 0; // Kordynanty X początkowe gracza
const playerY = 0; // Kordynanty Y początkowe gracza

const joinGame = () => { // Dołączanie do gry
  document.body.style.backgroundColor = '#121212';

  gameContainer.style.display = 'block';
  loginContainer.style.display = 'none';

  draw();
}

const draw = () => { // Funkcja rysowania
  requestAnimationFrame(draw);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const grassImg = createImage('grass');
  const playerImg = createImage('player');
  ctx.drawImage(grassImg, 0, 0);
  ctx.drawImage(playerImg, playerX, playerY);
}

const createImage = path => { // Funkcja tworzenia obrazu
  const image = document.createElement('img');
  image.src = `images/${path}.png`;
  return image;
}