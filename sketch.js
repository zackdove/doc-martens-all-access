const images = [];
const sources = [
  "images/gallery/1.png",
  "images/gallery/2.png",
  "images/gallery/3.png",
  "images/gallery/4.png",
  "images/gallery/5.png",
];

let scrollAmount = 0;

// Offset of each image from one another
const offset = 500;

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= -window.innerHeight &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) +
        window.innerHeight
  );
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

// Total distance of each path
const maxDistance = offset * sources.length;
class MovingImage {
  constructor(url, index) {
    this.image = loadImage(url);
    this.index = index;
    this.isOdd = index % 2 === 0;
    this.x = 0;
    this.y = 0;
    // Counter-clockwise from 0
    this.angle = Math.random() * 2 * Math.PI;
    // Distance from center
    this.distance = index * offset;
    this.startX = 0;
    this.startY = 0;
  }
  update() {
    this.distance =
      mod(this.index * offset + frameCount * 2 + scrollAmount, maxDistance) -
      maxDistance / 2;
    this.x = this.distance * Math.cos(this.angle);
    this.y = this.distance * Math.sin(this.angle);
  }
  draw() {
    if (
      this.x > -width / 2 - this.image.width &&
      this.x < width / 2 + this.image.width &&
      this.y > -height / 2 - this.image.height &&
      this.y < height / 2 + this.image.height
    ) {
      image(
        this.image,
        -this.image.width / 2 + this.x,
        -this.image.height / 2 + this.y
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
  document.addEventListener("wheel", () => {
    if (isElementInViewport(imageGallery1)) {
      console.log("HES IN");
      imageGallery1.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (isElementInViewport(imageGallery2)) {
      console.log("HES IN");
      imageGallery2.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
