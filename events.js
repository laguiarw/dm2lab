/*
 * Event photo galleries
 *
 * Each element with data-gallery works independently, so multiple event
 * cards can have their own sets of photos and arrow controls.
 */

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const images = Array.from(gallery.querySelectorAll(".event-image"));
  const previousButton = gallery.querySelector("[data-gallery-previous]");
  const nextButton = gallery.querySelector("[data-gallery-next]");
  const count = gallery.querySelector("[data-gallery-count]");

  if (images.length < 2) {
    previousButton?.remove();
    nextButton?.remove();
    count?.remove();
    return;
  }

  let activeIndex = Math.max(
    0,
    images.findIndex((image) => image.classList.contains("is-active"))
  );

  const showImage = (newIndex) => {
    images[activeIndex].classList.remove("is-active");
    activeIndex = (newIndex + images.length) % images.length;
    images[activeIndex].classList.add("is-active");
    count.textContent = `${activeIndex + 1} / ${images.length}`;
  };

  previousButton.addEventListener("click", () => showImage(activeIndex - 1));
  nextButton.addEventListener("click", () => showImage(activeIndex + 1));
});
