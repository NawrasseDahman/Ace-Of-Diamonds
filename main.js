// Elements
const card = document.querySelector('section');
const values = document.querySelectorAll('aside');

// State
const zs = [];

// Diamond
function createDiamond(i) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
  if (i !== undefined) {
    const z = -i * 25;
    zs.push(z);
  }
  
  svg.setAttribute('viewBox', '0 0 64 84');
  path.setAttribute('d', 'M2,42 Q20,25 32,2 Q44,25 62,42 Q44,59 32,82 Q20,59 2,42z');
  svg.appendChild(path);
  return svg;
}

// Setup
function setup() {
  // Valuate
  values.forEach((v) => {
    v.appendChild(createDiamond());
  });
  
  // Intervals
  const intervals = [0, 2, 5, 11, 23, 47];
  
  // Mine
  setTimeout(() => {
    intervals.forEach((i, j) => {
      const diamond = createDiamond(i);
      card.appendChild(diamond);
      setTimeout(() => {
        diamond.setAttribute('style', `transform: translateZ(${zs[j]}px);`);
      }, 30 * j);
    });
  }, 1250);
}

// Parallax
function parallax(e) {
  const { clientX, clientY } = e;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const diamonds = document.querySelectorAll('section > svg');
  
  diamonds.forEach((d, i) => {
    const x = (-7 + (clientX / (w / 14))) - i;
    const y = (-7 + (clientY / (h / 14))) - i;
    d.setAttribute('style', `transform: translate(${x}px, ${y}px) translateZ(${zs[i]}px);`);
  });
  
  const yDeg = -10 + (clientX / (w / 20));
  const xDeg = -10 + (clientY / (h / 20));
  card.setAttribute('style', `transform: rotateY(${yDeg}deg) rotateX(${xDeg}deg);`);
}

// Events
window.addEventListener('load', setup);
window.addEventListener('mousemove', parallax);
