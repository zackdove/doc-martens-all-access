const images = [];

const sources = [
  "images/gallery/Landscape/Dr-Martens-All-Access-Landscape-2023-1.jpg",
  "images/gallery/Landscape/Dr-Martens-All-Access-Landscape-Gallery-2023-2.jpg",
  "images/gallery/Landscape/Dr-Martens-All-Access-Landscape-Gallery-2023-3.jpg",
  "images/gallery/Landscape/Dr-Martens-All-Access-Landscape-Gallery-2023-4.jpg",
  "images/gallery/Landscape/Dr-Martens-All-Access-Landscape-Gallery-2023-5.jpg",
  "images/gallery/Landscape/Dr-Martens-All-Access-Landscape-Gallery-2023-6.jpg",
  "images/gallery/Landscape/Dr-Martens-All-Access-Landscape-Gallery-2023-7.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-1.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-2.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-3.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-4.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-5.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-7.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-8.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-9.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-10.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-11.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-12.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-13.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-14.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-15.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-17.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-18.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-19.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-20.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-21.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-22.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-23.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-24.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-25.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-26.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-27.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-28.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-29.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-30.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-31.jpg",
  "images/gallery/Portrait/Dr-Martens-All-Access-Portrait-Gallery-2023-32.jpg",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(sources);

let scrollAmount = 0;

// 0 for not, 1 for top, 2 for second
let containerInView = 0;

// Offset of each image from one another
const offset = 500;

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= -window.innerHeight - 100 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) +
        window.innerHeight +
        100
  );
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

// Total distance of each path
const maxDistance = (offset * sources.length) / 2;
class MovingImage {
  constructor(url, index) {
    this.image = loadImage(url);
    this.index = index;
    this.isEven = index % 2 === 0;
    this.indexInSet = Math.floor(index / 2);
    // console.log(this.index);
    // console.log(this.indexInSet);
    this.isHorizontal = this.image.width > this.image.height;
    this.scale = this.isHorizontal ? 1 : 0.6 + Math.random() * 0.4;
    this.x = 0;
    this.y = 0;
    // Counter-clockwise from 0
    this.angle = Math.random() * 2 * Math.PI;
    // Distance from center
    this.distance = this.indexInSet * offset;
    this.startX = 0;
    this.startY = 0;
  }
  update() {
    this.distance =
      mod(
        this.indexInSet * offset + frameCount * 2 + scrollAmount,
        maxDistance
      ) -
      maxDistance / 2;
    this.x = this.distance * Math.cos(this.angle);
    this.y = this.distance * Math.sin(this.angle);
  }
  draw() {
    if (
      this.x > -width / 2 - this.image.width &&
      this.x < width / 2 + this.image.width &&
      this.y > -height / 2 - this.image.height &&
      this.y < height / 2 + this.image.height &&
      ((this.isEven && containerInView === 1) ||
        (!this.isEven && containerInView === 2))
    ) {
      image(
        this.image,
        -this.image.width / 2 + this.x,
        -this.image.height / 2 + this.y,
        this.image.width * this.scale,
        this.image.height * this.scale
      );
    }
  }
}

function preload() {
  for (let i = 0; i < sources.length; i++) {
    images.push(new MovingImage(sources[i], i));
  }
  console.log(images);
}

function handleWheel(e) {
  scrollAmount += e.deltaY;
  e.preventDefault();
}

function setup() {
  frameRate(30);
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("imageGalleryBehind");
  // canvas.addEventListener("wheel", handleWheel);
  const el = document.querySelector(".p5Canvas");
  el.addEventListener("wheel", handleWheel);

  const imageGallery1 = document.getElementById("imageGallery1");
  const imageGallery2 = document.getElementById("imageGallery2");
  window.addEventListener("wheel", () => {
    if (isElementInViewport(imageGallery1)) {
      console.log("HES IN");
      containerInView = 1;
      imageGallery1.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (isElementInViewport(imageGallery2)) {
      console.log("HES IN");
      containerInView = 2;
      imageGallery2.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      containerInView = 0;
    }
  });
}

function draw() {
  background(0, 0, 0);
  for (let i of images) {
    i.update();
  }
  for (let i of images) {
    i.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
