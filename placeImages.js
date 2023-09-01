console.log(imageConfig);

const imagesContainer = document.getElementById("imagesContainer");

let prevTop = 0;
let mouseDown = false;
let drag = false;

let dragStartX = 0;
let dragStartY = 0;
let dragEndX = 0;
let dragEndY = 0;

let currentZ = 1;

let hasActive = false;
let currentImg;
let prevLeft;
let prevWidth;
let prevScroll;
let prevHeight;
let prevRect;
let prevScale;
let xOffset = 0;
let yOffset = 0;

window.addEventListener("mousemove", handleDrag);

for (let i = 0; i < imageConfig.images.length; i++) {
  const img = document.createElement("img");
  img.src = imageConfig.images[i].url;
  imagesContainer.appendChild(img);
  img.style.width = `${imageConfig.images[i].width}vw`;
  img.classList.add("placedImage");
  img.style.left = `${imageConfig.images[i].x}vw`;
  const top = prevTop + imageConfig.images[i].yOffset;
  prevTop = top;
  img.style.top = `${top}vw`;
  img.draggable = false;
  img.style.transformOrigin = "0% 0%";
  let dragging = true;
  img.dataset.dragEndX = 0;
  img.dataset.dragEndY = 0;
  img.addEventListener("mousedown", (e) => {
    drag = false;
    mouseDown = true;
    img.style.zIndex = currentZ;
    currentZ++;
    currentImg = e.target;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    // if (hasActive) removeActive();
  });

  img.addEventListener("mouseup", (e) => {
    drag ? null : handleClick(e);

    if (!hasActive) {
      img.dataset.dragEndX =
        Number(img.dataset.dragEndX) + e.clientX - dragStartX;
      img.dataset.dragEndY =
        Number(img.dataset.dragEndY) + e.clientY - dragStartY;
      dragStartX = null;
      dragStartY = null;
      mouseDown = false;
    }
  });

  img.addEventListener("mouseout", (e) => {
    drag = false;
    // dragStartX = null;
    // dragStartY = null;
    // mouseDown = false;
  });

  if (i == imageConfig.images.length - 1) {
    const div = document.createElement("div");
    div.style.top = img.style.top;
    div.style.height = "120vh";
    div.style.width = "1px";
    div.style.position = "absolute";
    div.style.userSelect = "none";
    imagesContainer.appendChild(div);
  }
}

// Notes
// * Have 2 images: high/low res.
//  nice to support both a solo or a high/low res mix
// When to swap?
// 1. on click (pre transform)
// 2. post transform

function makeActive(img) {
  currentImg = img;

  prevLeft = img.style.left;
  prevTop = img.style.top;
  prevWidth = img.style.width;
  prevHeight = img.style.height;
  const rect = img.getBoundingClientRect();
  prevRect = rect;
  //   make it from absolute to fixed

  img.classList.add("active");
  prevScroll = window.scrollY;

  const isHorizontal = rect.width > rect.height;
  document.getElementById("imagesContainer").classList.add("hasActive");
  let scaleFactor;
  xOffset = 0;
  yOffset = 0;
  const widthHeightRatio = rect.width / rect.height;

  const fitsHorizontal =
    widthHeightRatio > window.innerWidth / window.innerHeight;
  if (fitsHorizontal) {
    scaleFactor = rect.width / window.innerWidth;
    const fullHeight = window.innerWidth / widthHeightRatio;
    // yOffset = (window.innerHeight - fullHeight) / 2;
    yOffset =
      -rect.top +
      (window.innerHeight - fullHeight) / 2 +
      Number(img.dataset.dragEndY);
    xOffset = -rect.left + Number(img.dataset.dragEndX);
  } else {
    scaleFactor = rect.height / window.innerHeight;
    const fullWidth = window.innerHeight * widthHeightRatio;
    yOffset = -rect.top + Number(img.dataset.dragEndY);
    xOffset =
      -rect.left +
      (window.innerWidth - fullWidth) / 2 +
      Number(img.dataset.dragEndX);
  }
  prevScale = scaleFactor;

  //   img.style.top = `${rect.y}px`;
  //   img.style.left = `${rect.x}px`;

  gsap.fromTo(
    img,
    {
      x: Number(currentImg.dataset.dragEndX),
      y: Number(currentImg.dataset.dragEndY),
    },
    {
      x: xOffset,
      y: yOffset,
      scale: 1 / scaleFactor,
      duration: 0.6,
    }
  );
}

function removeActive() {
  console.log(window.scrollY);
  hasActive = false;
  gsap.fromTo(
    currentImg,
    { x: xOffset, y: yOffset },
    {
      scale: 1,
      x: Number(currentImg.dataset.dragEndX),
      y: Number(currentImg.dataset.dragEndY),
      onComplete: () => {
        currentImg.classList.remove("active");
        document
          .getElementById("imagesContainer")
          .classList.remove("hasActive");
      },
    }
  );
}

window.addEventListener("scroll", handleScroll);
function handleScroll(e) {
  mouseDown = false;
  if (hasActive) removeActive();
}

function handleClick(e) {
  if (hasActive) {
    hasActive = false;
    removeActive();
  } else {
    hasActive = true;
    makeActive(e.target);
  }
}

function handleDrag(e) {
  drag = true;
  if (mouseDown && !hasActive) {
    const img = currentImg;
    // const deltaX = dragStartX ? e.clientX - dragStartX : 0;
    // const deltaY = dragStartY ? e.clientY - dragStartY : 0;
    // dragEndX = deltaX;
    // dragEndY = deltaY;

    console.log(img.dataset.dragEndX);
    console.log(e.clientX);
    console.log(dragStartX);
    console.log(Number(img.dataset.dragEndX) + e.clientX - dragStartX);

    img.style.transform = `translate(${
      Number(img.dataset.dragEndX) + e.clientX - dragStartX
    }px, ${Number(img.dataset.dragEndY) + e.clientY - dragStartY}px)`;
  }
}
