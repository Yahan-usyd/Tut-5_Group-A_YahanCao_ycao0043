/****************** Define global variables ******************/
const baseWidth = 1000;
const baseHeight = 600;
// Variables for the Sensing-Feeling quadrant visualization
let triangles = []; // Store triangles in the Sensing-Feeling quadrant
let dotSpacing = 24; // Dot spacing in the Sensing-Feeling pattern
let dotRadius = 2; // Dot radius in the Sensing-Feeling pattern
// Store original triangle positions for responsive design
let relativeTriangles = [];

// Add global variables for "top left zone" 
let topLeftRectSizeNoise = [];
let topLeftRectPosNoiseX = [];
let topLeftRectPosNoiseY = [];
let topLeftCircleSizeNoise = [];
let topLeftCirclePosNoiseX = [];
let topLeftCirclePosNoiseY = [];
const noiseArrayLength = 100;
const noiseStep = 0.05;

// Add global variables of "easing + transformation" animation for "top right zone"
const lineAnimationTime = 180; // Whole animation time
const lineEntranceFactor = 0.7; // Entrance animation ratio

// Add animation variables for "top right lines"
let topRightAnimationFrame = 0;
let topRightNoiseOffset = 0;

// Add variable to control bottom left triangle refresh rate
// Variables to control the refresh frequency of bottom left triangles to reduce CPU usage
let bottomLeftTriangles = []; // Store generated triangles to avoid recalculating every frame
let triangleRefreshFrame = 0; // Track when to refresh triangles (currently unused, reserved for future expansion)
const triangleRefreshInterval = 60; // Refresh triangles every 60 frames (approximately 1 second at 60fps)

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

// New function to create RGBA colors with separate RGB and alpha values
// This function is used for the shape in the lower right corner
function makeRGBA(redInputValue, greenInputValue, blueInputValue, alphaInputValue) {
  return {
    r: redInputValue,
    g: greenInputValue,
    b: blueInputValue,
    a: alphaInputValue
  };
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
// Changed the color definition of the upper right rectangle in the group code
// Used the newly added makeRGBA() method to prepare for the transparency gradient in combination with noise in the following function.
const rects_topright_background_yellow = [
  { x: 0, y: 40, w: 140, h: 20, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 0, y: 100, w: 120, h: 50, color: makeRGBA(245, 202, 37, 0.9) },
  { x: 210, y: 105, w: 60, h: 90, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 460, y: 10, w: 40, h: 30, color: makeRGBA(245, 202, 37, 0.6) },
  { x: 425, y: 10, w: 35, h: 290, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 350, y: 10, w: 5, h: 30, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 340, y: 10, w: 5, h: 30, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 330, y: 10, w: 5, h: 30, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 320, y: 10, w: 5, h: 30, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 310, y: 10, w: 5, h: 30, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 300, y: 10, w: 5, h: 30, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 290, y: 10, w: 5, h: 30, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 280, y: 200, w: 220, h: 40, color: makeRGBA(245, 202, 37, 0.9) },
  { x: 200, y: 195, w: 280, h: 5, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 210, y: 185, w: 30, h: 35, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 250, y: 235, w: 230, h: 25, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 160, y: 215, w: 60, h: 50, color: makeRGBA(245, 202, 37, 0.6) },
  { x: 130, y: 215, w: 20, h: 30, color: makeRGBA(245, 202, 37, 0.7) },
]
const rects_topright_background_red = [
  { x: 0, y: 160, w: 130, h: 50, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 390, y: 195, w: 110, h: 105, color: makeRGBA(217, 16, 9, 0.9) },
  { x: 390, y: 10, w: 35, h: 210, color: makeRGBA(217, 16, 9, 0.7) },
  { x: 360, y: 10, w: 30, h: 210, color: makeRGBA(217, 16, 9, 0.7) },
  { x: 0, y: 230, w: 100, h: 10, color: makeRGBA(217, 16, 9, 0.6) },
  { x: 60, y: 230, w: 40, h: 40, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 0, y: 270, w: 140, h: 20, color: makeRGBA(217, 16, 9, 0.7) },
  { x: 120, y: 210, w: 140, h: 20, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 175, y: 205, w: 145, h: 20, color: makeRGBA(217, 16, 9, 0.9) },
  { x: 290, y: 230, w: 40, h: 20, color: makeRGBA(217, 16, 9, 0.7) },
  { x: 200, y: 220, w: 40, h: 20, color: makeRGBA(217, 16, 9, 0.8) },
]
const rects_topright_building_red = [
  { x: 250, y: 100, w: 35, h: 95, color: makeRGBA(217, 16, 9, 0.9) },
  { x: 255, y: 90, w: 25, h: 15, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 238, y: 170, w: 10, h: 45, color: makeRGBA(217, 16, 9, 0.7) },
  { x: 200, y: 130, w: 35, h: 65, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 174, y: 170, w: 25, h: 25, color: makeRGBA(217, 16, 9, 0.9) },
  { x: 174, y: 162, w: 20, h: 8, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 120, y: 120, w: 55, h: 90, dots: true, color: makeRGBA(217, 16, 9, 0.7) },
  { x: 125, y: 110, w: 45, h: 10, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 300, y: 166, w: 30, h: 20, color: makeRGBA(217, 16, 9, 0.9) },
  { x: 328, y: 166, w: 30, h: 25, color: makeRGBA(217, 16, 9, 0.8) },
  { x: 352, y: 120, w: 6, h: 50, color: makeRGBA(217, 16, 9, 0.7) },
  { x: 348, y: 140, w: 3, h: 30, color: makeRGBA(217, 16, 9, 0.6) },
  { x: 258, y: 188, w: 100, h: 5, color: makeRGBA(217, 16, 9, 0.8) },
]
const rects_topright_building_black = [
  { x: 256, y: 80, w: 3, h: 10, color: makeRGBA(0, 0, 0, 0.9) },
  { x: 260, y: 80, w: 3, h: 10, color: makeRGBA(0, 0, 0, 0.9) },
  { x: 265, y: 80, w: 5, h: 10, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 272, y: 80, w: 3, h: 10, color: makeRGBA(0, 0, 0, 0.9) },
  { x: 276, y: 80, w: 3, h: 10, color: makeRGBA(0, 0, 0, 0.9) },
  { x: 274, y: 75, w: 4, h: 6, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 269, y: 75, w: 4, h: 6, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 263, y: 75, w: 5, h: 6, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 258, y: 75, w: 4, h: 6, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 262, y: 60, w: 5, h: 14, color: makeRGBA(0, 0, 0, 0.9) },
  { x: 268, y: 60, w: 5, h: 14, color: makeRGBA(0, 0, 0, 0.9) },
  { x: 266, y: 25, w: 2, h: 34, color: makeRGBA(0, 0, 0, 0.7) },
  { x: 275, y: 93, w: 1, h: 8, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 258, y: 93, w: 1, h: 8, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 60, y: 140, w: 45, h: 55, color: makeRGBA(0, 0, 0, 0.8) },
  { x: 135, y: 70, w: 5, h: 40, color: makeRGBA(0, 0, 0, 0.7) },
  { x: 460, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
  { x: 464, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
  { x: 468, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
  { x: 472, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
  { x: 476, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
  { x: 480, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
  { x: 484, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
  { x: 488, y: 150, w: 3, h: 40, color: makeRGBA(0, 0, 0, 0.6) },
]
const rects_topright_building_yellow = [
  { x: 300, y: 110, w: 45, h: 19, color: makeRGBA(245, 202, 37, 0.9) },
  { x: 300, y: 130, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 133, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 136, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 139, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 142, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 145, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 148, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 151, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 154, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 157, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 160, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 163, w: 45, h: 2, color: makeRGBA(245, 202, 37, 0.8) },
  { x: 300, y: 166, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 300, y: 169, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 300, y: 172, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 300, y: 175, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 300, y: 178, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 300, y: 181, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 300, y: 184, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 300, y: 187, w: 30, h: 2, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 20, y: 170, w: 25, h: 35, color: makeRGBA(245, 202, 37, 0.8) },
]
const rects_topright_background_white = [
  { x: 330, y: 220, w: 60, h: 80, dots: true, color: makeRGBA(248, 249, 251, 0.9) },
  { x: 30, y: 110, w: 60, h: 80, dots: true, color: makeRGBA(248, 249, 251, 0.9) }
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
  { x: 30, y: -10, r: 180, color: makeRGBA(245, 202, 37, 0.3) },
  { x: 160, y: 165, r: 28, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 140, y: 90, r: 20, color: makeRGBA(245, 202, 37, 1) },
  { x: 180, y: 40, r: 5, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 160, y: 20, r: 10, color: makeRGBA(245, 202, 37, 0.7) },
]
const rects_bottom_right_yellow = [
  { x: 250, y: 0, w: 250, h: 60, color: makeRGBA(245, 202, 37, 1) },
  { x: 320, y: 90, w: 180, h: 80, color: makeRGBA(245, 202, 37, 0.5) },
  { x: 220, y: 170, w: 100, h: 130, color: makeRGBA(245, 202, 37, 1) },
  { x: 0, y: 250, w: 140, h: 40, color: makeRGBA(245, 202, 37, 0.7) },
  { x: 0, y: 170, w: 100, h: 120, color: makeRGBA(245, 202, 37, 0.5) },
]
const rects_bottom_right_blue = [
  { x: 0, y: 0, w: 100, h: 130, color: makeRGBA(17, 99, 247, 0.7) },
  { x: 0, y: 130, w: 100, h: 40, color: makeRGBA(17, 99, 247, 0.4) },
  { x: 30, y: 220, w: 150, h: 40, color: makeRGBA(17, 99, 247, 0.5) },
  { x: 140, y: 200, w: 80, h: 100, color: makeRGBA(17, 99, 247, 0.2) },
  { x: 400, y: 200, w: 100, h: 100, color: makeRGBA(17, 99, 247, 0.7) },
]
const circles_bottomright_blue = [
  { x: 360, y: 230, r: 20, color: makeRGBA(17, 99, 247, 1) },
  { x: 320, y: 150, r: 10, color: makeRGBA(17, 99, 247, 1) },
  { x: 100, y: 220, r: 10, color: makeRGBA(17, 99, 247, 1) },
  { x: 100, y: 40, r: 10, color: makeRGBA(17, 99, 247, 1) },
  { x: 320, y: 70, r: 25, color: makeRGBA(17, 99, 247, 1) },
  { x: 410, y: 210, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 430, y: 210, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 450, y: 210, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 470, y: 210, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 490, y: 210, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 410, y: 230, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 430, y: 230, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 450, y: 230, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 470, y: 230, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 490, y: 230, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 410, y: 250, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 430, y: 250, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 450, y: 250, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 470, y: 250, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 490, y: 250, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 410, y: 270, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 430, y: 270, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 450, y: 270, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 470, y: 270, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 490, y: 270, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 410, y: 290, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 430, y: 290, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 450, y: 290, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 470, y: 290, r: 5, color: makeRGBA(17, 99, 247, 1) },
  { x: 490, y: 290, r: 5, color: makeRGBA(17, 99, 247, 1) },
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
  //noLoop();// Remove noLoop() so that the draw function can continue to play the animation.
  generateStructuredTriangles(6, 8); // Rule grid structure
  updateTriangles();

  // Pre-generate Perlin Noise sequence for the TopLeft region
  for (let i = 0; i < noiseArrayLength; i++) {
    // Noise of rectangle size variation
    topLeftRectSizeNoise.push(noise(i * noiseStep));
    // Noise of rectangle position X offset
    topLeftRectPosNoiseX.push(noise(i * noiseStep + 10)); // +10 错开噪点起始
    // Noise of rectangle position Y offset
    topLeftRectPosNoiseY.push(noise(i * noiseStep + 20));
    // Noise of varying circular size
    topLeftCircleSizeNoise.push(noise(i * noiseStep + 30));
    // Noise of circular position X offset
    topLeftCirclePosNoiseX.push(noise(i * noiseStep + 40));
    // Noise of circular position Y offset
    topLeftCirclePosNoiseY.push(noise(i * noiseStep + 50));
  }
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

  // Step1: Add noise offset for dots animation
  let dotsNoiseOffset = frameCount * 0.02;

  fill(245, 202, 37);
  noStroke();
  
  // Step2: Track dot index for different noise offsets
  let dotIndex = 0;
  for (let x = rectObj.x + gapX / 2; x < rectObj.x + rectObj.w; x += gapX) {
    for (let y = rectObj.y + gapY / 2; y < rectObj.y + rectObj.h; y += gapY) {
      // Step3: Generate noise-based position offset for each dot
      let noiseX = noise(dotsNoiseOffset + dotIndex * 0.1);
      let noiseY = noise(dotsNoiseOffset + dotIndex * 0.1 + 100);
      
      // Step4: Map noise to position offset (small range for subtle movement)
      let offsetX = map(noiseX, 0, 1, -2, 2) * scaleX;
      let offsetY = map(noiseY, 0, 1, -2, 2) * scaleY;
      
      // Step5: Apply offset to dot position
      let dotX = x + offsetX;
      let dotY = y + offsetY;
      
      ellipse(dotX, dotY, dotR, dotR);
      dotIndex++;
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
  // Get current frame index for looping noise array
  let currentIndex = frameCount % noiseArrayLength;
  // Draw animated rectangles with slight position and size jitter
  for (let i = 0; i < rects_topleft.length; i++) {
    let r = rects_topleft[i];
    fill(r.color);
    noStroke();

    // Animation: apply noise for subtle movement and scale
    // Get a stable noise index for this frame and this shape
    let rectNoiseIndex = (currentIndex + i * 5) % noiseArrayLength;
    // Step 1: Size noise-let the width and height fluctuate slightly above and below the original size
    let sizeFactor = map(topLeftCircleSizeNoise[rectNoiseIndex], 0, 1, 0.98, 1.03);
    // Step 2: Position fluctuation based on separate noise arrays
    let offsetX = map(topLeftRectPosNoiseX[rectNoiseIndex], 0, 1, -1, 1) * scaleX;
    let offsetY = map(topLeftRectPosNoiseY[rectNoiseIndex], 0, 1, -1, 1) * scaleY;
    // Step 3: Calculate animated size and adjusted position (to keep center aligned)
    let startW = r.w * scaleX;
    let startH = r.h * scaleY;
    let animatedW = startW * sizeFactor;
    let animatedH = startH * sizeFactor;
    let x = r.x * scaleX + offsetX + (startW - animatedW) / 2;
    let y = r.y * scaleY + offsetY + (startH - animatedH) / 2;

    rect(x, y, animatedW, animatedH);
  }

  // Draw triangles
  for (let i = 0; i < triangles_topleft.length; i++) {
    let t = triangles_topleft[i];
    let triangleNoiseIndex = (currentIndex + i * 12) % noiseArrayLength;
    fill(t.color);
    noStroke();
    beginShape();
    for (let j = 0; j < t.points.length; j++) {
      let point = t.points[j];
      // Slight noise-based offset for each vertex
      let tOffsetX = map(topLeftCirclePosNoiseX[triangleNoiseIndex], 0, 1, -0.8, 0.8) * scaleX;
      let tOffsetY = map(topLeftCirclePosNoiseY[triangleNoiseIndex], 0, 1, -0.8, 0.8) * scaleY;
      let x = point.x * scaleX + tOffsetX;
      let y = point.y * scaleY + tOffsetY;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  // Draw circles
  for (let i = 0; i < circles_topleft.length; i++) {
    let c = circles_topleft[i];
    fill(c.color);
    noStroke();

    // Step 1: Animation variables
    let circleNoiseIndex = (currentIndex + i * 7) % noiseArrayLength;
    // Radius fluctuation
    let radiusFactor = map(topLeftCircleSizeNoise[circleNoiseIndex], 0, 1, 0.95, 1.5);
    // Step 2: Position fluctuation
    let cOffsetX = map(topLeftCirclePosNoiseX[circleNoiseIndex], 0, 1, -0.8, 0.8) * scaleX;
    let cOffsetY = map(topLeftCirclePosNoiseY[circleNoiseIndex], 0, 1, -0.8, 0.8) * scaleY;
    let x = c.x * scaleX + cOffsetX;
    let y = c.y * scaleY + cOffsetY;
    // Step 3: Calculate animated radius and draw full or arc shape
    let r = c.r * ((scaleX + scaleY) / 2);
    let animateR = r * radiusFactor;
    // Determine whether it is a full circle or a half circle.
    if (c.type === 'full') {
      ellipse(x, y, animateR * 2, animateR * 2);
    } else if (c.type === 'arc') {
      arc(x, y, animateR * 2, animateR * 2, c.startAngle, c.endAngle, PIE);
    }
  }
  // Draw lines
  for (let i = 0; i < lines_topleft.length; i++) {
    let l = lines_topleft[i];
    stroke(l.color);
    // Animation variables: use noise to vary stroke weight and position slightly
    let lineNoiseIndex = (currentIndex + i * 2) % noiseArrayLength;
    let weightFactor = map(topLeftCircleSizeNoise[lineNoiseIndex], 0, 1, 0.8, 1.2); // or another appropriate noise array
    let lOffsetX = map(topLeftCirclePosNoiseX[lineNoiseIndex], 0, 1, -0.8, 0.8) * scaleX;
    let lOffsetY = map(topLeftCirclePosNoiseY[lineNoiseIndex], 0, 1, -0.8, 0.8) * scaleY;
    // Animation
    strokeWeight(l.weight * ((scaleX + scaleY) / 2) * weightFactor);
    let x1 = l.x1 * scaleX + lOffsetX;
    let y1 = l.y1 * scaleY + lOffsetY;
    let x2 = l.x2 * scaleX;
    let y2 = l.y2 * scaleY;
    line(x1, y1, x2, y2);
  }
}

//---------------- Function: draw top right shapes ----------------//
function drawTopRight(scaleX, scaleY) {
  // Update animation variables
  topRightAnimationFrame = (topRightAnimationFrame + 1) % lineAnimationTime;
  topRightNoiseOffset += 0.02;

  // Calculate noise-based speed factor
  // Use the noise() function to generate a speed change factor (0.8-1.2 times)
  // To make the animation speed have a natural fluctuation effect
  let speedFactor = map(noise(topRightNoiseOffset), 0, 1, 0.8, 1.2);

  // Add noise offset for top right transparency animation
  let topRightTransparencyNoiseOffset = frameCount * 0.015;

  push();
  translate(width, 0); // Move the origin to the right side
  scale(-1, 1);        // Flip horizontally
  // Draw background shapes
  for (let i = 0; i < rects_topright_background_yellow.length; i++) {
    let r = rects_topright_background_yellow[i];
    // Step 1: Use Perlin noise to generate a unique alpha base value for this rectangle
    let alphaNoise = noise(topRightTransparencyNoiseOffset + i * 0.1);
    // Step 2: Map the noise value (0 to 1) to alpha range (0 to 1)
    let alpha = map(alphaNoise, 0, 1, 0, 1);

    // Step 3: Apply dynamic alpha to fill color (converted to 0–255 scale)
    // Use the new color object structure makeRGBA()
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }

  // Draw red background rectangles (same alpha animation logic)
  for (let i = 0; i < rects_topright_background_red.length; i++) {
    let r = rects_topright_background_red[i];
    let alphaNoise = noise(topRightTransparencyNoiseOffset + i * 0.12 + 100);
    let alpha = map(alphaNoise, 0, 1, 0, 1);
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }
  pop();

  // Draw white background rectangles
  for (let i = 0; i < rects_topright_background_white.length; i++) {
    let r = rects_topright_background_white[i];
    // Step 1: Generate noise-based alpha
    let alphaNoise = noise(topRightTransparencyNoiseOffset + i * 0.15 + 200);
    // Step 2: Map to alpha range and apply to fill
    let alpha = map(alphaNoise, 0, 1, 0, 1);

    // Use the new color object structure with dynamic alpha
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
    noStroke();
    // Draw white rectangle with optional decorative dots
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
    let alphaNoise = noise(topRightTransparencyNoiseOffset + i * 0.08 + 300);
    let alpha = map(alphaNoise, 0, 1, 0, 1);
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
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
    let alphaNoise = noise(topRightTransparencyNoiseOffset + i * 0.05 + 400);
    let alpha = map(alphaNoise, 0, 1, 0, 1);
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
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
    // Generate noise-based alpha value (0 to 1)
    let alphaNoise = noise(topRightTransparencyNoiseOffset + i * 0.06 + 500);
    let alpha = map(alphaNoise, 0, 1, 0, 1);

    // Use the new color object structure with dynamic alpha
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
    noStroke();
    rect(
      r.x * scaleX,
      r.y * scaleY,
      r.w * scaleX,
      r.h * scaleY
    );
  }

  // Draw animated lines with entrance effects  using noise, easing, and axis-based transform
  // Group all lines and animate based on their orientation
  // This group method is generate from Copilot
  /* Prompts: I want to use the method of "if the x1 and x2 coordinates are almost the same (the difference is less than 1),
              it means this is a vertical line" to distinguish the horizontal and vertical line animations in the three const groups.
              How can I modify the code without adjusting the const array?
  */
  let allLines = [
    // Spread all items from lines_topright_n,
    // and for each line, add a new property: weight = m
    ...lines_topright_1.map(l => ({ ...l, weight: 10 })),// ...1: Keep all original properties of the line (x1, y1, x2, y2)
    ...lines_topright_2.map(l => ({ ...l, weight: 5 })),
    ...lines_topright_3.map(l => ({ ...l, weight: 2 }))
  ];

  for (let i = 0; i < allLines.length; i++) {
    let l = allLines[i];
    let isVertical = abs(l.x1 - l.x2) < 1;   // If x coordinates are nearly the same, it's vertical
    let isHorizontal = abs(l.y1 - l.y2) < 1; // If y coordinates are nearly the same, it's horizontal

    // Calculate animation progress with offset based on line index
    let progress = ((topRightAnimationFrame * speedFactor + i * 5) % lineAnimationTime) / lineAnimationTime;
    let ease = easeAnimation(progress % 1);

    let translateX = 0;
    let translateY = 0;

    if (isHorizontal) {
      // Horizontal line - animate from left
      // ease from 0 to 1, map maps it to -200 * scaleX to 0
      // means smooth transition from left -200px * scale ratio to target position
      translateX = map(ease, 0, 1, -200 * scaleX, 0);
    } else if (isVertical) {
      // Vertical line - animate from top
      // Similarly, translate from -200 * scaleY to 0 to achieve top-down animation
      translateY = map(ease, 0, 1, -200 * scaleY, 0);
    }

    push();
    translate(translateX, translateY);
    stroke(makeRGB(0, 0, 0));
    strokeWeight(l.weight); // 'l.weight' was defined when I created 'allLines' by mapping each line and adding a custom 'weight' property
    line(l.x1 * scaleX, l.y1 * scaleY, l.x2 * scaleX, l.y2 * scaleY);
    pop();
  }

  pop();
}

// Easing function for smooth animation
function easeAnimation(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

  //--------- More changes about bottom-left random triangles -------------//
  // Only regenerate triangles at specific intervals to reduce CPU usage
  // This prevents the triangles from flickering every frame and improves performance
  if (frameCount % triangleRefreshInterval === 0 || bottomLeftTriangles.length === 0) {
    bottomLeftTriangles = []; // Clear existing triangles to prepare for new generation
    
    // Generate and store triangles with their properties
    for (let i = 0; i < triangleCount; i++) {
      let size = random(minSize, maxSize); // Random triangle size within bounds
      let x = random(border.x + size, border.x + border.w - size); // Random x position avoiding borders
      let y = random(border.y + size, border.y + border.h - size); // Random y position avoiding borders
      let angle = random(TWO_PI); // Random rotation angle for triangle orientation
      let points = []; // Array to store triangle vertices
      
      // Generate three vertices for equilateral triangle
      for (let j = 0; j < 3; j++) {
        let px = x + cos(angle + j * TWO_PI / 3) * size; // Calculate x coordinate of vertex
        let py = y + sin(angle + j * TWO_PI / 3) * size; // Calculate y coordinate of vertex
        points.push(createVector(px, py)); // Add vertex to points array
      }
      
      // Randomly select two colors for gradient effect
      let c1 = colors[floor(random(colors.length))]; // First gradient color
      let c2 = colors[floor(random(colors.length))]; // Second gradient color
      
      // Store triangle data for later drawing (avoids recalculation every frame)
      bottomLeftTriangles.push({
        points: points,    // Triangle vertices
        color1: c1,        // First gradient color
        color2: c2         // Second gradient color
      });
    }
  }

  // Draw stored triangles using cached data (much more efficient than regenerating every frame)
  for (let i = 0; i < bottomLeftTriangles.length; i++) {
    let triangle = bottomLeftTriangles[i]; // Get triangle data from cache
    drawGradientTriangle(
      triangle.points[0],  // First vertex
      triangle.points[1],  // Second vertex
      triangle.points[2],  // Third vertex
      color(triangle.color1[0], triangle.color1[1], triangle.color1[2], 160), // First gradient color with alpha
      color(triangle.color2[0], triangle.color2[1], triangle.color2[2], 160)  // Second gradient color with alpha
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
  // Add noise offset for bottom right animation
  let bottomRightNoiseOffset = frameCount * 0.02;

  push();

  translate(width, height); // Move the origin to the bottom right corner.
  scale(-1, -1); // Horizontal + vertical flip.

  // Draw yellow circles with animated transparency
  for (let i = 0; i < circles_bottomright_yellow.length; i++) {
    let c = circles_bottomright_yellow[i];

    // Step 1: Generate Perlin noise value (range 0–1)
    // 'i * 0.1' adds variation per circle; no offset means it's the base group
    let alphaNoise = noise(bottomRightNoiseOffset + i * 0.1);

    // Step 2: Map noise to alpha (transparency) between 0 and 1
    // Higher noise = more opaque
    let alpha = map(alphaNoise, 0, 1, 0, 1);

    // Step 3: Set fill color using RGBA, with alpha scaled to 255
    fill(c.color.r, c.color.g, c.color.b, alpha * 255);
    noStroke();

    // Step 4: Scale position and radius based on canvas scaling
    let x = c.x * scaleX;
    let y = c.y * scaleY;
    let radius = c.r * ((scaleX + scaleY) / 2);

    // Step 5: Draw the circle
    ellipse(x, y, radius * 2, radius * 2);
  }

  // Draw yellow rectangles with animated transparency
  for (let i = 0; i < rects_bottom_right_yellow.length; i++) {
    let r = rects_bottom_right_yellow[i];
    let alphaNoise = noise(bottomRightNoiseOffset + i * 0.15 + 100);
    let alpha = map(alphaNoise, 0, 1, 0, 1);
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
    noStroke();
    rect(r.x * scaleX, r.y * scaleY, r.w * scaleX, r.h * scaleY);
  }

  // Draw blue rectangles with animated transparency
  for (let i = 0; i < rects_bottom_right_blue.length; i++) {
    let r = rects_bottom_right_blue[i];
    let alphaNoise = noise(bottomRightNoiseOffset + i * 0.12 + 200);
    let alpha = map(alphaNoise, 0, 1, 0, 1);
    fill(r.color.r, r.color.g, r.color.b, alpha * 255);
    noStroke();
    rect(r.x * scaleX, r.y * scaleY, r.w * scaleX, r.h * scaleY);
  }

  // Draw blue circles with animated transparency
  for (let i = 0; i < circles_bottomright_blue.length; i++) {
    let c = circles_bottomright_blue[i];
    let alphaNoise = noise(bottomRightNoiseOffset + i * 0.08 + 300);
    let alpha = map(alphaNoise, 0, 1, 0, 1);
    fill(c.color.r, c.color.g, c.color.b, alpha * 255);
    noStroke();
    let x = c.x * scaleX;
    let y = c.y * scaleY;
    let radius = c.r * ((scaleX + scaleY) / 2);
    ellipse(x, y, radius * 2, radius * 2);
  }

  // Draw animated blue lines with transparency
  for (let i = 0; i < lines_bottomright.length; i++) {
    let l = lines_bottomright[i];
    let alphaNoise = noise(bottomRightNoiseOffset + i * 0.05 + 400);
    let alpha = map(alphaNoise, 0, 1, 0, 1);
    stroke(17, 99, 247, alpha * 255);
    strokeWeight(2);
    line(l.x1 * scaleX, l.y1 * scaleY, l.x2 * scaleX, l.y2 * scaleY);
  }


  // Draw arcs with animated transparency and rotation
  for (let i = 0; i < arcs_bottomright.length; i++) {
    const arcs = arcs_bottomright[i];

    // Generate noise-based alpha value (range: 0 to 1)
    // 'i * 0.18' ensures each shape has a unique noise input
    // '+500' offsets the noise space to avoid interference with other noise calls
    let alphaNoise = noise(bottomRightNoiseOffset + i * 0.18 + 500);
    // Map Perlin noise output (0–1) directly to an alpha range (0–1)
    let alpha = map(alphaNoise, 0, 1, 0, 1);

    // Generate noise-based rotation speed (per shape)
    // Again, 'i * 0.1' creates variation between shapes
    // '+600' further offsets the noise space for independence from alpha
    let rotationNoise = noise(bottomRightNoiseOffset + i * 0.1 + 600);
    // Map the noise (0–1) to a small speed range (0.005 to 0.02 radians/frame)
    let rotationSpeed = map(rotationNoise, 0, 1, 0.005, 0.02);

    // Calculate normalized rotation progress using frame count
    // (frameCount * speed) creates continuous motion
    // '% 1' keeps the result within [0, 1] to feed into the easing function
    let rotationProgress = (frameCount * rotationSpeed) % 1;
    // Apply easing function to create smooth acceleration/deceleration
    // Multiply by TWO_PI to convert normalized progress to angle (0 to 2π radians)
    let rotationAngle = easeAnimation(rotationProgress) * TWO_PI;

    // Calculate the arc's center position in screen space
    // Multiply relative center coordinates by scaling factors to adapt to canvas size
    let arcCenterX = arcs.cx * scaleX;
    let arcCenterY = arcs.cy * scaleY;

    // Scale the arc radius according to average of X and Y scaling
    // (in case scaleX ≠ scaleY, this keeps it roughly proportional)
    let arcRadius = arcs.radius * ((scaleX + scaleY) / 2);

    // Apply rotation around arc center
    push();
    translate(arcCenterX, arcCenterY);
    rotate(rotationAngle);
    translate(-arcCenterX, -arcCenterY);

    stroke(17, 99, 247, alpha * 255);
    strokeWeight(2);
    noFill();
    arc(
      arcCenterX,
      arcCenterY,
      arcRadius,
      arcRadius,
      arcs.startAngle,
      arcs.endAngle,
    );

    pop();
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
  bottomLeftTriangles = []; // Reset bottom left triangles for regeneration when window size changes
  redraw();
}