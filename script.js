const CANVAS_WIDTH = 1920; // px
const CANVAS_HEIGHT = 1080; // px

function makePixel(x, y, color = 'yellow', size = 5) {
  const div = document.createElement('div');
  div.classList.add('pixel');

  div.style.backgroundColor = color;
  div.style.height = `${size}px`;
  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
  div.style.width = `${size}px`;

  return div;
}

function getAbsolutePosition(x1, y1) {
  const x2 = x1 + CANVAS_WIDTH / 2;
  const y2 = y1 + CANVAS_HEIGHT / 2;

  return { x2, y2 };
}

function putPixel(x, y, color, size) {
  const GAP = 40; // px
  
  // CSS 'top' property is the opposite of y coordinates in the cartesian plane
  y = -y;

  const { x2, y2 } = getAbsolutePosition(x * GAP, y * GAP);
  const pixel = makePixel(x2, y2, color, size);

  document.body.appendChild(pixel);
}

const dinoPixels = [
  [-2, 5], [-1, 5],
  [-4 ,4], [-3, 4], [6, 4],
  [-5, 3],
  [-5, 2], [-2, 2], [1, 2],
  [-5, 1], [-2, 1], [3, 1], [5, 1],
  [-4, 0], [-1, 0],
  [3, -1],
  [1, -2],
  [0, -3], [2, -3],
  [-1, -4], [1, -4]
];

for (const [x, y] of dinoPixels) {
  putPixel(x, y, 'black', 10);
}
