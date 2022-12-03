const CANVAS_WIDTH = 1920; // px
const CANVAS_HEIGHT = 1080; // px
const GAP = 40; // px

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
  // CSS 'top' property is the opposite of y coordinates in the cartesian plane
  y = -y;

  const { x2, y2 } = getAbsolutePosition(x * GAP, y * GAP);
  const pixel = makePixel(x2, y2, color, size);

  document.body.appendChild(pixel);
}

function computeAngle([x1, y1], [x2, y2]) {
  const diffX = Math.abs(x1 - x2);
  const diffY = Math.abs(y1 - y2);

  return Math.atan(diffY / diffX);
}

function computeSegmentLength([x1, y1], [x2, y2]) {
  const diffX = Math.abs(x1 - x2);
  const diffY = Math.abs(y1 - y2);

  return Math.hypot(diffX, diffY);
}

let totalSegments = 0;
function drawSegment([x1, y1], [x2, y2]) {
  const segmentElement = document.createElement('div');
  segmentElement.className = 'segment';
  segmentElement.style.width = `${computeSegmentLength([x1, y1], [x2, y2]) * GAP}px`;
  
  const [x, y, xOther, yOther] = y1 < y2 ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
  const { x2: aX, y2: aY } = getAbsolutePosition(x * GAP, -y * GAP);
  segmentElement.style.left = `${aX}px`;
  segmentElement.style.top = `${aY}px`;

  const computedAngle = computeAngle([x1, y1], [x2, y2]);
  const angle = x > xOther ? Math.PI - computedAngle : computedAngle;
  segmentElement.style.transform = `rotate(${-angle}rad)`;
  document.body.appendChild(segmentElement);
}

function drawPolygon(points) {
  points.forEach(([x1, y1], i) => {
    const [x2, y2] = points[(i + 1) % points.length];
    drawSegment([x1, y1], [x2, y2]);
  });
}

const dinoPixels = [
  [-5, 2], [-5, 3], [-4, 4], [-3, 4], [-2, 5], [-1, 5],
  [1, 2], [3, 1], [6, 4], [5, 1], [3, -1], [1, -2],
  [2, -3], [1, -4], [-1, -4], [0, -3], [-1, 0], [-2, 1],
  [-4, 0], [-5, 1], [-2, 2]
];

for (const [x, y, highlight] of dinoPixels) {
  putPixel(x, y, highlight ? 'red' : 'black', 10);
}

drawPolygon(dinoPixels);
