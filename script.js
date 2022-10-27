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
  const { x2, y2 } = getAbsolutePosition(x, y);
  const pixel = makePixel(x2, y2, color, size);

  document.body.appendChild(pixel);
}

putPixel(0, 0, 'red', 15);
