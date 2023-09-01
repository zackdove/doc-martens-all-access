const storiesEls = document.querySelectorAll("#stories > a");

const storyBackgrounds = document.querySelectorAll("#storiesBackgrounds > img");

const canHover = !matchMedia("(hover: none)").matches;

if (canHover) {
  for (let i = 0; i < storiesEls.length; i++) {
    storiesEls[i].addEventListener("pointerover", () => {
      storyBackgrounds[i].classList.add("show");
    });
    storiesEls[i].addEventListener("pointerout", () => {
      storyBackgrounds[i].classList.remove("show");
    });
    storiesEls[i].addEventListener("pointerleave", () => {
      storyBackgrounds[i].classList.remove("show");
    });
  }
} else {
  let i = 0;
  setInterval(() => {
    for (let j = 0; j < storiesEls.length; j++) {
      storiesEls[j].classList.remove("hover");
      storyBackgrounds[j].classList.remove("show");
    }
    storiesEls[i].classList.add("hover");
    storyBackgrounds[i].classList.add("show");
    i = (i + 1) % storiesEls.length;
  }, 2000);
}
