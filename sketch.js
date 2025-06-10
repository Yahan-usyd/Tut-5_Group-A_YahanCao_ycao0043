/****************** Define global variables ******************/
const baseWidth = 1000;
const baseHeight = 600;
// Variables for the Sensing-Feeling quadrant visualization
let triangles = []; // Store triangles in the Sensing-Feeling quadrant
let dotSpacing = 24; // Dot spacing in the Sensing-Feeling pattern
let dotRadius = 2; // Dot radius in the Sensing-Feeling pattern
// Store original triangle positions for responsive design
let relativeTriangles = [];


/************** Color palrtte and random function **************/
const palette = [
  [36, 149, 248],  //blue 1
  [17, 99, 247],   //blue 2
  [217, 16, 9],    //red 1
  [209, 55, 47],   //red 2
  [245, 202, 37],  //yellow 1
  [240, 214, 45],  //yellow 2
  [74, 86, 102],   //black
  [217, 217, 217], //grey 1
  [230, 229, 234], //grey 2
  [248, 249, 251], //white
];
// random color
function randomInt(maximum) {
  // Return a random integer from 0 up to (but not including) maximum
  return Math.floor(Math.random() * maximum);
}
function makeRGB(redInputValue, greenInputValue, blueInputValue) {
  if (redInputValue !== undefined && greenInputValue !== undefined && blueInputValue !== undefined) {
    return `rgb(${redInputValue}, ${greenInputValue}, ${blueInputValue})`;
  } else {
    let color = palette[randomInt(palette.length)];
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }
}

/****************** Top left shape data definition ******************/
const rects_topleft = [
  { x: 0, y: 10, w: 250, h: 280, color: makeRGB(36, 149, 248) },
  { x: 290, y: 10, w: 210, h: 290, color: makeRGB(230, 229, 234) },
  { x: 0, y: 200, w: 90, h: 90, color: makeRGB(74, 86, 102) },
  { x: 90, y: 200, w: 70, h: 60, color: makeRGB(248, 249, 251) },
  { x: 90, y: 260, w: 70, h: 40, color: makeRGB(36, 149, 248) },
  { x: 220, y: 200, w: 70, h: 60, color: makeRGB(74, 86, 102) },
  { x: 160, y: 260, w: 130, h: 40, color: makeRGB(230, 229, 234) },
  { x: 160, y: 100, w: 170, h: 120, color: makeRGB(17, 99, 247) },
];
const circles_topleft = [
  { x: 130, y: 85, r: 80, startAngle: 1 / 2 * Math.PI, endAngle: -1 / 2 * Math.PI, color: makeRGB(245, 202, 37), type: 'arc' },
  { x: 130, y: 85, r: 80, startAngle: -1 / 2 * Math.PI, endAngle: 1 / 2 * Math.PI, color: makeRGB(74, 86, 102), type: 'arc' },
  { x: 60, y: 165, r: 30, color: makeRGB(17, 99, 247), type: 'full' },
  { x: 290, y: 50, r: 30, color: makeRGB(17, 99, 247), type: 'full' },
  { x: 400, y: 75, r: 40, startAngle: 0, endAngle: Math.PI / 2, color: makeRGB(248, 249, 251), type: 'arc' },
  { x: 400, y: 75, r: 40, startAngle: Math.PI / 2, endAngle: Math.PI, color: makeRGB(36, 149, 248), type: 'arc' },
  { x: 400, y: 75, r: 40, startAngle: Math.PI, endAngle: 3 * Math.PI / 2, color: makeRGB(248, 249, 251), type: 'arc' },
  { x: 400, y: 75, r: 40, startAngle: 3 * Math.PI / 2, endAngle: 2 * Math.PI, color: makeRGB(74, 86, 102), type: 'arc' },
];
const lines_topleft = [
  { x1: 160, y1: 100, x2: 160, y2: 220, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 170, y1: 100, x2: 170, y2: 220, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 180, y1: 100, x2: 180, y2: 220, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 190, y1: 100, x2: 190, y2: 220, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 200, y1: 100, x2: 200, y2: 220, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 210, y1: 100, x2: 210, y2: 220, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 280, y1: 100, x2: 280, y2: 300, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 290, y1: 100, x2: 290, y2: 300, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 300, y1: 100, x2: 300, y2: 300, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 310, y1: 100, x2: 310, y2: 300, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 320, y1: 100, x2: 320, y2: 300, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 330, y1: 100, x2: 330, y2: 300, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 330, y1: 260, x2: 500, y2: 90, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 330, y1: 250, x2: 500, y2: 80, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 330, y1: 240, x2: 500, y2: 70, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 330, y1: 230, x2: 500, y2: 60, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 280, y1: 100, x2: 390, y2: 0, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 290, y1: 100, x2: 400, y2: 0, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 300, y1: 100, x2: 410, y2: 0, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 310, y1: 100, x2: 420, y2: 0, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 320, y1: 100, x2: 430, y2: 0, color: makeRGB(248, 249, 251), weight: 2 },
  { x1: 330, y1: 100, x2: 440, y2: 0, color: makeRGB(248, 249, 251), weight: 2 },
];
const triangles_topleft = [
  // Large yellow triangle (side length 190)
  {
    points: [
      { x: 500, y: 300 }, // Right angle vertex (origin of coordinate axes)
      { x: 310, y: 300 }, // Horizontal edge point (left 190)
      { x: 500, y: 110 }  // Vertical edge point (upward 190)
    ],
    color: makeRGB(245, 202, 37),
    type: 'right_triangle_large'
  },
  // Small blue triangle (side length 110)
  {
    points: [
      { x: 500, y: 300 }, // Right angle vertex (origin of coordinate axes)
      { x: 390, y: 300 }, // Horizontal edge point (left 110)
      { x: 500, y: 190 }  // Vertical edge point (upward 110)
    ],
    color: makeRGB(36, 149, 248),
    type: 'right_triangle_small'
  }
];

/****************** Top right shape data definition ******************/
const rects_topright_background_yellow = [
  { x: 0, y: 40, w: 140, h: 20 },
  { x: 0, y: 100, w: 120, h: 50 },
  { x: 210, y: 105, w: 60, h: 90 },
  { x: 460, y: 10, w: 40, h: 30 },
  { x: 425, y: 10, w: 35, h: 290 },
  { x: 350, y: 10, w: 5, h: 30 },
  { x: 340, y: 10, w: 5, h: 30 },
  { x: 330, y: 10, w: 5, h: 30 },
  { x: 320, y: 10, w: 5, h: 30 },
  { x: 310, y: 10, w: 5, h: 30 },
  { x: 300, y: 10, w: 5, h: 30 },
  { x: 290, y: 10, w: 5, h: 30 },
  { x: 280, y: 200, w: 220, h: 40 },
  { x: 200, y: 195, w: 280, h: 5 },
  { x: 210, y: 185, w: 30, h: 35 },
  { x: 250, y: 235, w: 230, h: 25 },
  { x: 160, y: 215, w: 60, h: 50 },
  { x: 130, y: 215, w: 20, h: 30 },
]
const rects_topright_background_red = [
  { x: 0, y: 160, w: 130, h: 50 },
  { x: 390, y: 195, w: 110, h: 105 },
  { x: 390, y: 10, w: 35, h: 210 },
  { x: 360, y: 10, w: 30, h: 210 },
  { x: 0, y: 230, w: 100, h: 10 },
  { x: 60, y: 230, w: 40, h: 40 },
  { x: 0, y: 270, w: 140, h: 20 },
  { x: 120, y: 210, w: 140, h: 20 },
  { x: 175, y: 205, w: 145, h: 20 },
  { x: 290, y: 230, w: 40, h: 20 },
  { x: 200, y: 220, w: 40, h: 20 },
]
const rects_topright_building_red = [
  { x: 250, y: 100, w: 35, h: 95 },
  { x: 255, y: 90, w: 25, h: 15 },
  { x: 238, y: 170, w: 10, h: 45 },
  { x: 200, y: 130, w: 35, h: 65 },
  { x: 174, y: 170, w: 25, h: 25 },
  { x: 174, y: 162, w: 20, h: 8 },
  { x: 120, y: 120, w: 55, h: 90, dots: true },
  { x: 125, y: 110, w: 45, h: 10 },
  { x: 300, y: 166, w: 30, h: 20 },
  { x: 328, y: 166, w: 30, h: 25 },
  { x: 352, y: 120, w: 6, h: 50 },
  { x: 348, y: 140, w: 3, h: 30 },
  { x: 258, y: 188, w: 100, h: 5 },
]
const rects_topright_building_black = [
  { x: 256, y: 80, w: 3, h: 10 },
  { x: 260, y: 80, w: 3, h: 10 },
  { x: 265, y: 80, w: 5, h: 10 },
  { x: 272, y: 80, w: 3, h: 10 },
  { x: 276, y: 80, w: 3, h: 10 },
  { x: 274, y: 75, w: 4, h: 6 },
  { x: 269, y: 75, w: 4, h: 6 },
  { x: 263, y: 75, w: 5, h: 6 },
  { x: 258, y: 75, w: 4, h: 6 },
  { x: 262, y: 60, w: 5, h: 14 },
  { x: 268, y: 60, w: 5, h: 14 },
  { x: 266, y: 25, w: 2, h: 34 },
  { x: 275, y: 93, w: 1, h: 8 },
  { x: 258, y: 93, w: 1, h: 8 },
  { x: 60, y: 140, w: 45, h: 55 },
  { x: 135, y: 70, w: 5, h: 40 },
  { x: 460, y: 150, w: 3, h: 40 },
  { x: 464, y: 150, w: 3, h: 40 },
  { x: 468, y: 150, w: 3, h: 40 },
  { x: 472, y: 150, w: 3, h: 40 },
  { x: 476, y: 150, w: 3, h: 40 },
  { x: 480, y: 150, w: 3, h: 40 },
  { x: 484, y: 150, w: 3, h: 40 },
  { x: 488, y: 150, w: 3, h: 40 },
]
const rects_topright_building_yellow = [
  { x: 300, y: 110, w: 45, h: 19 },
  { x: 300, y: 130, w: 45, h: 2 },
  { x: 300, y: 133, w: 45, h: 2 },
  { x: 300, y: 136, w: 45, h: 2 },
  { x: 300, y: 139, w: 45, h: 2 },
  { x: 300, y: 142, w: 45, h: 2 },
  { x: 300, y: 145, w: 45, h: 2 },
  { x: 300, y: 148, w: 45, h: 2 },
  { x: 300, y: 151, w: 45, h: 2 },
  { x: 300, y: 154, w: 45, h: 2 },
  { x: 300, y: 157, w: 45, h: 2 },
  { x: 300, y: 160, w: 45, h: 2 },
  { x: 300, y: 163, w: 45, h: 2 },
  { x: 300, y: 166, w: 30, h: 2 },
  { x: 300, y: 169, w: 30, h: 2 },
  { x: 300, y: 172, w: 30, h: 2 },
  { x: 300, y: 175, w: 30, h: 2 },
  { x: 300, y: 178, w: 30, h: 2 },
  { x: 300, y: 181, w: 30, h: 2 },
  { x: 300, y: 184, w: 30, h: 2 },
  { x: 300, y: 187, w: 30, h: 2 },
  { x: 20, y: 170, w: 25, h: 35 },
]
const rects_topright_background_white = [
  { x: 330, y: 220, w: 60, h: 80, dots: true },
  { x: 30, y: 110, w: 60, h: 80, dots: true }
]
const lines_topright_1 = [
  { x1: 0, y1: 210, x2: 175, y2: 210 }
]
const lines_topright_2 = [
  { x1: 240, y1: 195, x2: 500, y2: 195 },
  { x1: 280, y1: 210, x2: 500, y2: 210 },
]
const lines_topright_3 = [
  { x1: 0, y1: 40, x2: 500, y2: 40 },
  { x1: 0, y1: 90, x2: 90, y2: 90 },
  { x1: 0, y1: 230, x2: 120, y2: 230 },
  { x1: 0, y1: 255, x2: 250, y2: 255 },
  { x1: 0, y1: 265, x2: 500, y2: 265 },
  { x1: 0, y1: 170, x2: 20, y2: 170 },
  { x1: 0, y1: 200, x2: 120, y2: 200 },
  { x1: 380, y1: 140, x2: 500, y2: 140 },
  { x1: 380, y1: 205, x2: 500, y2: 205 },
  { x1: 0, y1: 210, x2: 500, y2: 210 },
  { x1: 60, y1: 10, x2: 60, y2: 290 },
  { x1: 90, y1: 10, x2: 90, y2: 290 },
  { x1: 120, y1: 10, x2: 120, y2: 290 },
  { x1: 150, y1: 10, x2: 150, y2: 40 },
  { x1: 440, y1: 210, x2: 440, y2: 300 },
  { x1: 430, y1: 220, x2: 430, y2: 300 },
  { x1: 280, y1: 210, x2: 280, y2: 300 },
  { x1: 260, y1: 210, x2: 260, y2: 300 },
  { x1: 240, y1: 195, x2: 240, y2: 300 },
  { x1: 180, y1: 140, x2: 180, y2: 300 },
]

/****************** Bottom right shape data definition ******************/
const circles_bottomright_yellow = [
  { x: 30, y: -10, r: 180, color: 'rgba(245, 202, 37, 0.3)' },
  { x: 160, y: 165, r: 28, color: 'rgba(245, 202, 37, 0.7)' },
  { x: 140, y: 90, r: 20, color: 'rgba(245, 202, 37, 1)' },
  { x: 180, y: 40, r: 5, color: 'rgba(245, 202, 37, 0.5)' },
  { x: 160, y: 20, r: 10, color: 'rgba(245, 202, 37, 0.7)' },
]
const rects_bottom_right_yellow = [
  { x: 250, y: 0, w: 250, h: 60, color: 'rgba(245, 202, 37, 1)' },
  { x: 320, y: 90, w: 180, h: 80, color: 'rgba(245, 202, 37, 0.5)' },
  { x: 220, y: 170, w: 100, h: 130, color: 'rgba(245, 202, 37, 1)' },
  { x: 0, y: 250, w: 140, h: 40, color: 'rgba(245, 202, 37, 0.7)' },
  { x: 0, y: 170, w: 100, h: 120, color: 'rgba(245, 202, 37, 0.5)' },
]
const rects_bottom_right_blue = [
  { x: 0, y: 0, w: 100, h: 130, color: 'rgba(17, 99, 247, 0.7)' },
  { x: 0, y: 130, w: 100, h: 40, color: 'rgba(17, 99, 247, 0.4)' },
  { x: 30, y: 220, w: 150, h: 40, color: 'rgba(17, 99, 247, 0.5)' },
  { x: 140, y: 200, w: 80, h: 100, color: 'rgba(17, 99, 247, 0.2)' },
  { x: 400, y: 200, w: 100, h: 100, color: 'rgba(17, 99, 247, 0.7)' },
]
const circles_bottomright_blue = [
  { x: 360, y: 230, r: 20, color: 'rgba(17, 99, 247, 1)' },
  { x: 320, y: 150, r: 10, color: 'rgba(17, 99, 247, 1)' },
  { x: 100, y: 220, r: 10, color: 'rgba(17, 99, 247, 1)' },
  { x: 100, y: 40, r: 10, color: 'rgba(17, 99, 247, 1)' },
  { x: 320, y: 70, r: 25, color: 'rgba(17, 99, 247, 1)' },
  { x: 410, y: 210, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 430, y: 210, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 450, y: 210, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 470, y: 210, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 490, y: 210, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 410, y: 230, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 430, y: 230, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 450, y: 230, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 470, y: 230, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 490, y: 230, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 410, y: 250, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 430, y: 250, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 450, y: 250, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 470, y: 250, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 490, y: 250, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 410, y: 270, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 430, y: 270, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 450, y: 270, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 470, y: 270, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 490, y: 270, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 410, y: 290, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 430, y: 290, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 450, y: 290, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 470, y: 290, r: 5, color: 'rgba(17, 99, 247, 1)' },
  { x: 490, y: 290, r: 5, color: 'rgba(17, 99, 247, 1)' },
  
]
const lines_bottomright = [
  { x1: 0, y1: 200, x2: 180, y2: 200 },
  { x1: 0, y1: 170, x2: 100, y2: 170 },
  { x1: 0, y1: 130, x2: 100, y2: 130 },
  { x1: 100, y1: 60, x2: 320, y2: 60 },
  { x1: 180, y1: 300, x2: 180, y2: 200 },
  { x1: 100, y1: 220, x2: 100, y2: 40 },
  { x1: 360, y1: 220, x2: 360, y2: 170 },
  { x1: 320, y1: 150, x2: 320, y2: 0 },
  { x1: 183, y1: 120, x2: 183, y2: 0 },
  { x1: 410, y1: 200, x2: 410, y2: 300 },
  { x1: 430, y1: 200, x2: 430, y2: 300 },
  { x1: 450, y1: 200, x2: 450, y2: 300 },
  { x1: 470, y1: 200, x2: 470, y2: 300 },
  { x1: 490, y1: 200, x2: 490, y2: 300 },
]
const arcs_bottomright = [
  {
    cx: 100,
    cy: 115,
    radius: 132,
    startAngle: Math.PI / 35,
    endAngle: Math.PI / 2,
  },
  {
    cx: 235,
    cy: 185,
    radius: 220,
    startAngle: Math.PI / 6,
    endAngle: Math.PI / 1.1,
  },
  {
    cx: 100,
    cy: 115,
    radius: 132,
    startAngle: Math.PI / 2,
    endAngle: Math.PI / -2,
  },
  {
    cx: 330,
    cy: 170,
    radius: 48,
    startAngle: -Math.PI / 2,
    endAngle: 0,
  }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  generateStructuredTriangles(6, 8); // Rule grid structure
  updateTriangles();
}


/**************************** Main drawing function ****************************/
function draw() {
  background(250, 247, 235);
  // Calculate the horizontal and vertical scaling ratios to ensure that the graphic adapts to the screen size.
  // width and height are the current width and height of the canvas.
  // baseWidth and baseHeight are the original dimensions used as a reference during design.
  let scaleX = width / baseWidth;
  let scaleY = height / baseHeight;

  //-----------------------Top left-----------------------//
  drawTopLeft(scaleX, scaleY);

  //-----------------------Top right-----------------------//
  drawTopRight(scaleX, scaleY);

  //----------------------Bottom left----------------------//
  drawBottomLeft(scaleX, scaleY);

  //----------------------Bottom right---------------------//
  drawBottomRight(scaleX, scaleY);

  // Draw fixed-size, scalable circles at a specified location //
  drawFixedCircles(scaleX, scaleY);

  //-------------Draw coordinate axes and text------------//
  drawCoordinates();
  
}



/********************************* Function zone 1 *********************************/
//---- Function：draw dots inside the rectangle and scale to fit. ----//
function drawDotsInRect(rectObj, scaleX = 1, scaleY = 1) {
  let dotR = 5 * ((scaleX + scaleY) / 2);
  let gapX = 10 * scaleX;
  let gapY = 5 * scaleY;

  fill(245, 202, 37);
  noStroke();
  for (let x = rectObj.x + gapX / 2; x < rectObj.x + rectObj.w; x += gapX) {
    for (let y = rectObj.y + gapY / 2; y < rectObj.y + rectObj.h; y += gapY) {
      ellipse(x, y, dotR, dotR);
    }
  }
  stroke(20);
}

//---- Function：draw lines inside the circles and scale to fit. ----//
function drawLinesInCircle(circleObj) {
  let gap = circleObj.r / 8; // Gap of lines
  stroke(255, 221, 51);
  strokeWeight(2);
  // Filled with lines
  for (let y = circleObj.y - circleObj.r + gap / 2; y < circleObj.y + circleObj.r; y += gap) {
    for (let x = circleObj.x - circleObj.r; x <= circleObj.x + circleObj.r; x += 1) {
      if (dist(x, y, circleObj.x, circleObj.y) < circleObj.r) {
        point(x, y);
      }
    }
  }
  stroke(30);
}
/********************************* --------------- *********************************/


/************************ Function zone 2 - Drawing four parts ************************/
//---------------- Function: draw top left shapes ----------------//
function drawTopLeft(scaleX, scaleY) {
  for (let i = 0; i < rects_topleft.length; i++) {
    let r = rects_topleft[i];
    fill(r.color);
    noStroke();
    let x = r.x * scaleX;
    let y = r.y * scaleY;
    let w = r.w * scaleX;
    let h = r.h * scaleY;
    rect(x, y, w, h);

    if (r.dots) {
      drawDotsInRect({ x, y, w, h }, scaleX, scaleY);
    }
  }
  // Draw triangles
  for (let i = 0; i < triangles_topleft.length; i++) {
    let t = triangles_topleft[i];
    fill(t.color);
    noStroke();
    beginShape();
    for (let j = 0; j < t.points.length; j++) {
      let point = t.points[j];
      let x = point.x * scaleX;
      let y = point.y * scaleY;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  // Draw circles
  for (let i = 0; i < circles_topleft.length; i++) {
    let c = circles_topleft[i];
    fill(c.color);
    noStroke();
    let x = c.x * scaleX;
    let y = c.y * scaleY;
    let r = c.r * ((scaleX + scaleY) / 2);
    // Determine whether it is a full circle or a half circle.
    if (c.type === 'full') {
      ellipse(x, y, r * 2, r * 2);
    } else if (c.type === 'arc') {
      arc(x, y, r * 2, r * 2, c.startAngle, c.endAngle, PIE);
    }
  }
  // Draw lines
  for (let i = 0; i < lines_topleft.length; i++) {
    let l = lines_topleft[i];
    stroke(l.color);
    strokeWeight(l.weight * ((scaleX + scaleY) / 2));
    let x1 = l.x1 * scaleX;
    let y1 = l.y1 * scaleY;
    let x2 = l.x2 * scaleX;
    let y2 = l.y2 * scaleY;
    line(x1, y1, x2, y2);
  }
}

//---------------- Function: draw top right shapes ----------------//
function drawTopRight(scaleX, scaleY) {
  push();
  translate(width, 0); // Move the origin to the right side
  scale(-1, 1);        // Flip horizontally
  // Draw background shapes
  for (let i = 0; i < rects_topright_background_yellow.length; i++) {
    let r = rects_topright_background_yellow[i];
    fill(makeRGB(245, 202, 37));
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }
  for (let i = 0; i < rects_topright_background_red.length; i++) {
    let r = rects_topright_background_red[i];
    fill(makeRGB(217, 16, 9));
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }
  pop();
  for (let i = 0; i < rects_topright_background_white.length; i++) {
    let r = rects_topright_background_white[i];
    let fillColor = makeRGB(248, 249, 251);
    fill(fillColor);
    noStroke();
    let x = width - (r.x + r.w) * scaleX;
    let y = r.y * scaleY;
    let w = r.w * scaleX;
    let h = r.h * scaleY;
    rect(x, y, w, h);
    if (r.dots) {
      drawDotsInRect({ x, y, w, h }, scaleX, scaleY);
    }
  }

  // Draw buildings
  push();
  translate(width, 0);
  scale(-1, 1);
  for (let i = 0; i < rects_topright_building_red.length; i++) {
    let r = rects_topright_building_red[i];
    fill(makeRGB(217, 16, 9));
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }
  for (let i = 0; i < rects_topright_building_black.length; i++) {
    let r = rects_topright_building_black[i];
    fill(makeRGB(0, 0, 0));
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }
  for (let i = 0; i < rects_topright_building_yellow.length; i++) {
    let r = rects_topright_building_yellow[i];
    fill(makeRGB(245, 202, 37));
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }

  //Draw lines
  for (let i = 0; i < lines_topright_1.length; i++) {
    let l = lines_topright_1[i];
    stroke(makeRGB(0, 0, 0));
    strokeWeight(10);
    line(l.x1 * scaleX, l.y1 * scaleY, l.x2 * scaleX, l.y2 * scaleY);
  }
  for (let i = 0; i < lines_topright_2.length; i++) {
    let l = lines_topright_2[i];
    stroke(makeRGB(0, 0, 0));
    strokeWeight(5);
    line(l.x1 * scaleX, l.y1 * scaleY, l.x2 * scaleX, l.y2 * scaleY);
  }
  for (let i = 0; i < lines_topright_3.length; i++) {
    let l = lines_topright_3[i];
    stroke(makeRGB(0, 0, 0));
    strokeWeight(2);
    line(l.x1 * scaleX, l.y1 * scaleY, l.x2 * scaleX, l.y2 * scaleY);
  }
  pop();
}

//--------------------- Function: draw bottom left triangles-----------------------//
// Render the Sensing-Feeling quadrant with gradient triangles representing emotional patterns
function drawBottomLeft() {
  // Define the background border，to limit the area of the background and the content
  let backColorBorder = {
    x: 0,
    y: height / 2,  // Start from the middle line
    w: width / 2,   // Occupy the left half
    h: height / 2   // Distance to bottom
  }

  // Define the content border, the area of the gradient triangles.
  let border = {
    x: 20,
    y: height / 2 + 10,  // Start from the middle line with padding, to avoid the gradient triangles being too close to the top
    w: width / 2 - 75,   // Occupy the left half with right padding, the right padding is determined by the right side blue rectangles
    h: height / 2 - 10   // Leave space to the bottom, to avoid the gradient triangles being too close to the bottom
  };

  // Draw the background Content
  // The border of the background
  fill(250, 247, 235);
  noStroke();
  rect(backColorBorder.x, backColorBorder.y, backColorBorder.w, backColorBorder.h);

  // Draw grey diagonal lines.
  stroke(230, 230, 230);
  let greyLineSpacing = 20; // Spacing between grey lines

  // Draw grey diagonal lines from top-left to bottom-right with the spacing of greyLineSpacing (20).
  for (let i = 0; i <= backColorBorder.w; i += greyLineSpacing) {
    let startX = backColorBorder.x + i;
    let startY = backColorBorder.y;
    let endX = backColorBorder.x;
    let endY = backColorBorder.y + i;

    // If line exceeds bottom boundary, adjust endpoint
    if (endY > backColorBorder.y + backColorBorder.h) {
      let excess = endY - (backColorBorder.y + backColorBorder.h);
      endX += excess;
      endY = backColorBorder.y + backColorBorder.h;
    }

    line(startX, startY, endX, endY);
  }

  // Continue drawing grey lines to fill remaining space.
  // These lines start from near the right border (15px offset to avoid overlapping with blue vertical lines)
  // and extend to the bottom-right area, creating a diagonal pattern
  for (let i = greyLineSpacing; i <= backColorBorder.h; i += greyLineSpacing) {
    // Start point X: right border minus 15px offset to avoid overlapping with blue vertical lines
    let startX = backColorBorder.x + backColorBorder.w - 15;
    // Start point Y: moves down by grayLineSpacing (20px) each iteration
    let startY = backColorBorder.y + i;
    let endX = backColorBorder.x + backColorBorder.w - backColorBorder.h + i;
    let endY = backColorBorder.y + backColorBorder.h;

    line(startX, startY, endX, endY);
  }

  // Draw gradient blue diagonal lines in top-left corner
  stroke(146, 204, 248);
  for (let i = 0; i < border.w / 2; i += 20) {
    // Line weight gradually decreases with distance
    strokeWeight(8 - i / 35);
    line(backColorBorder.x + i, backColorBorder.y - 1, backColorBorder.x, backColorBorder.y + i);
  }

  // Draw gradient blue diagonal lines in bottom-left corner
  stroke(146, 204, 248);
  for (let i = 0; i < border.w / 2; i += 20) {
    // Line weight gradually decreases with distance
    strokeWeight(8 - i / 30);
    line(backColorBorder.x + i, backColorBorder.y + backColorBorder.h,
      backColorBorder.x, backColorBorder.y + backColorBorder.h - i);
  }

  // Draw blue vertical lines on the right side
  stroke(207, 232, 248);
  strokeWeight(2);
  for (let i = 0; i < border.w / 6; i += 15) {
    line(backColorBorder.x + backColorBorder.w - i, backColorBorder.y,
      backColorBorder.x + backColorBorder.w - i, backColorBorder.y + backColorBorder.h);
  }

  // Draw three blue rectangles with different widths on the right
  fill(146, 204, 248);
  noStroke();
  // Draw from right to left with decreasing width
  rect(width / 2 - 20, height / 2, 20, height / 2);  // Widest rectangle
  rect(width / 2 - 40, height / 2, 15, height / 2);  // Medium width
  rect(width / 2 - 55, height / 2, 10, height / 2);  // Narrowest rectangle


  // Draw gradient triangles in the content border
  // Limit the number and size of the triangles based on the border size (window size).
  let triangleCount = floor(border.w * border.h / 9000); // Calculate triangle count based on area, 9000 is number to make the triangle count reasonable, the less the number, the more triangles will be generated
  let minSize = min(border.w, border.h) / 10;            // Minimum triangle size
  let maxSize = min(border.w, border.h) / 6;             // Maximum triangle size

  // Define triangle colors
  let colors = [
    [36, 149, 248],  //blue
    [217, 16, 9],    //red
    [245, 202, 37],  //yellow
  ];

  // Generate and draw triangles randomly
  for (let i = 0; i < triangleCount; i++) {
    let size = random(minSize, maxSize);  // The length of the triangle, which is random between minSize and maxSize.
    // Randomly generate the x and y coordinates of the triangle, plus or minus the size of the triangle, to avoid the triangle is too close to the border.
    let x = random(border.x + size, border.x + border.w - size);
    let y = random(border.y + size, border.y + border.h - size);

    // Generate triangle vertices, the triangle is a equilateral triangle.
    // This section is generated by AI (ChatGPT), it is used to generate the vertices of the triangle.
    // The function is adjusted by Xinya Zhang to fit the needs of the project
    let angle = random(TWO_PI);  // Randomly generate the angle of the triangle, to rotate the angle of different triangles.
    let points = [];  // The array to store the vertices of the triangle.  
    // Each triangle has 3 vertices, so j = 3 to generate 3 vertices for each triangle.
    for (let j = 0; j < 3; j++) {
      // The x and y coordinates of the triangle are calculated by the angle and the size of the triangle.
      // The angle is the rotation angle of the triangle, the size is the length of the triangle.
      // For an equilateral triangle, the angle between each vertex is 0°, 120°, 240°. 
      // This technique is from https://editor.p5js.org/jht1493/sketches/cD9r2BqJH
      // The createVector is used to create a vector with the x and y coordinates of the triangle.
      // createVector documentation: https://p5js.org/reference/p5/createVector/
      // The push is used to add the vector to the points array.
      let px = x + cos(angle + j * TWO_PI / 3) * size;
      let py = y + sin(angle + j * TWO_PI / 3) * size;
      points.push(createVector(px, py));
    }

    // Randomly select two colors for gradient
    let c1 = colors[floor(random(colors.length))];
    let c2 = colors[floor(random(colors.length))];

    // Draw gradient triangle
    drawGradientTriangle(
      points[0],
      points[1],
      points[2],
      color(c1[0], c1[1], c1[2], 160),  // The color of the triangle, the alpha is 160, which is 60% transparent
      color(c2[0], c2[1], c2[2], 160)
    );
  }
}

//----------- Function: Generation and drawing of the triangular gradient background in the lower left corner -------------//
// Generate triangles representing emotional patterns in Sensing-Feeling quadrant (Left Corner)
// This technique is from https://editor.p5js.org/ogt/sketches/U2nApW3un
function generateStructuredTriangles(rows, cols) {
  relativeTriangles = [];
  // Divide the entire area into cols × rows grids, and set the relative width and height of each grid.
  let cellW = 1 / cols;
  let cellH = 1 / rows;

  // Increase the grid density to adapt to different screen sizes
  rows = max(rows, floor(height / 100));
  cols = max(cols, floor(width / 100));

  // Generate the adjacent right-angled triangles in rows and columns, and the triangles could form an equivalent triangle. 
  // Record the triangles vertices data to the relativeTriangles function
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * cellW;
      let y = i * cellH;
      relativeTriangles.push([
        createVector(x, y),
        createVector(x + cellW, y),
        createVector(x, y + cellH)
      ]);
      relativeTriangles.push([
        createVector(x + cellW, y),
        createVector(x + cellW, y + cellH),
        createVector(x, y + cellH)
      ]);
    }
  }
}
// Update triangle positions for responsive design (convert the relative triangles to actual coordinates)
function updateTriangles() {
  // Define the border of the Sensing-Feeling quadrant area (Left Corner)
  let border = {
    x: 0,
    y: height / 2 + 10,
    w: width / 2,
    h: height / 2 - 10
  };

  // Convert the relative triangles to actual coordinates
  // The function is generated by AI, it is used to convert the relative triangles to the actual coordinates
  // The function is adjusted by Xinya Zhang to fit the needs of the project
  // The Arrow Function (=>) is used to map the relative triangles to the actual coordinates
  // Traverse and convert each point in relativeTriangles from relative coordinates (0–1) to actual pixel coordinates
  // MDN Arrow Function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  triangles = relativeTriangles.map(tri => {
    return tri.map(pt => {
      return createVector(
        border.x + pt.x * border.w,
        border.y + pt.y * border.h
      );
    });
  });
}

// Draw gradient triangles representing emotional complexity
// The drawGradientTriangle function is modifyed base on the code from Jules Kris, Tristan Bunn, and the code is from the p5.js library.
// The link for the p5.js library: https://p5js.org/tutorials/color-gradients/
function drawGradientTriangle(p1, p2, p3, c1, c2) {
  let steps = 40; // Smoothness of emotional gradient
  for (let i = 0; i <= steps; i++) {
    let t = i / steps; // Define the step
    let xa = lerp(p1.x, p2.x, t); // Define the x coordinate of the triangle
    let ya = lerp(p1.y, p2.y, t); // Define the y coordinate of the triangle
    let xb = lerp(p1.x, p3.x, t); // Define the x coordinate of the triangle
    let yb = lerp(p1.y, p3.y, t); // Define the y coordinate of the triangle
    let col = lerpColor(c1, c2, t); // Define the color of the triangle
    stroke(col); // Draw the triangle with the color
    line(xa, ya, xb, yb); // Draw the triangle with the color
  }
}


//---------------- Function: draw bottom right shapes ----------------//
function drawBottomRight(scaleX, scaleY) {
  push();
   
  translate(width, height); // Move the origin to the bottom right corner.
  scale(-1, -1);            // Horizontal + vertical flip.
  for (let i = 0; i < circles_bottomright_yellow.length; i++) {
    let c = circles_bottomright_yellow[i];
    fill(c.color);
    noStroke();
    let x = c.x * scaleX;
    let y = c.y * scaleY;
    let r = c.r * ((scaleX + scaleY) / 2);
    ellipse(x, y, r * 2, r * 2);
  }
  for (let i = 0; i < rects_bottom_right_yellow.length; i++) {
    let r = rects_bottom_right_yellow[i];
    fill(r.color);
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }
  for (let i = 0; i < rects_bottom_right_blue.length; i++) {
    let r = rects_bottom_right_blue[i];
    fill(r.color);
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }
  for (let i = 0; i < circles_bottomright_blue.length; i++) {
    let c = circles_bottomright_blue[i];
    fill(c.color);
    noStroke();
    let x = c.x * scaleX;
    let y = c.y * scaleY;
    let r = c.r * ((scaleX + scaleY) / 2);
    ellipse(x, y, r * 2, r * 2);
  }
  for (let i = 0; i < lines_bottomright.length; i++) {
    let l = lines_bottomright[i];
    stroke(makeRGB(17, 99, 247));
    strokeWeight(2);
    line(l.x1 * scaleX, l.y1 * scaleY, l.x2 * scaleX, l.y2 * scaleY);
  }
  for (let i = 0; i < arcs_bottomright.length; i++) {
    const arcs = arcs_bottomright[i];
    stroke(makeRGB(17, 99, 247));
    strokeWeight(2);
    noFill();
    arc(
      arcs.cx * scaleX,
      arcs.cy * scaleY,
      arcs.radius * ((scaleX + scaleY) / 2),
      arcs.radius * ((scaleX + scaleY) / 2),
      arcs.startAngle,
      arcs.endAngle,
    );
  }
  pop();
}

//---------------- Function: draw fixed shapes ----------------//
function drawFixedCircles(scaleX, scaleY) {
  let refCircle1 = { x: 140, y: 15, w: 130, h: 120 };
  let circleX1 = width - (refCircle1.x + refCircle1.w / 2) * scaleX;
  let circleY1 = refCircle1.y * scaleY + (refCircle1.h / 2) * scaleY;
  let radius1 = 25 * scaleX;
  let fillColor1 = makeRGB(248, 249, 251);
  fill(fillColor1);
  noStroke();
  ellipse(circleX1, circleY1, radius1 * 2, radius1 * 2);
  drawLinesInCircle({ x: circleX1, y: circleY1, r: radius1 });

  let refCircle2 = { x: 150, y: 210, w: 130, h: 120 };
  let circleX2 = width - (refCircle2.x + refCircle2.w / 2) * scaleX;
  let circleY2 = refCircle2.y * scaleY + (refCircle2.h / 2) * scaleY;
  let radius2 = 25 * scaleX;
  let fillColor2 = makeRGB(248, 249, 251);
  fill(fillColor2);
  noStroke();
  ellipse(circleX2, circleY2, radius2 * 2, radius2 * 2);
  drawLinesInCircle({ x: circleX2, y: circleY2, r: radius2 });
}

//---------------- Function: draw coordinates axes ----------------//
function drawCoordinates() {
  stroke(10);
  strokeWeight(5);
  let margin = 40;
  let margin1 = 40;
  let margin2 = 105;
  // Horizontal line
  line(margin2, height / 2, width - margin2, height / 2);
  // Vertical lines
  line(width / 2, margin1, width / 2, height - margin1);
  // Text style
  textAlign(CENTER, CENTER);
  textSize(20);
  noStroke();
  fill(20);
  // Horizontal line：Sensing and Intuition
  text('Sensing', margin / 2 + textWidth('Sensing') / 2, height / 2);
  text('Intuition', width - margin / 2 - textWidth('Intuition') / 2, height / 2);
  // Vertical lines：Thinking and Feeling
  text('Thinking', width / 2, margin / 2);
  text('Feeling', width / 2, height - margin / 2);
}

//---------------- Function: resize canvas ----------------//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateStructuredTriangles(6, 8);
  updateTriangles();// Update the triangles positions of the Sensing-Feeling quadrant visualization (left bottom)
  redraw();
}