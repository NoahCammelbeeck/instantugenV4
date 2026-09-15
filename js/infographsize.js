document.addEventListener("DOMContentLoaded", function () {
  const matchbox = document.getElementById("matchbox");
  const small = document.getElementById("small");

  if (!matchbox || !small) return;

  [matchbox, small].forEach((el) => {
    el.style.transformBox = "fill-box";
    el.style.transformOrigin = "center";
    el.style.willChange = "transform";
  });

  function updateScale() {
    const viewportHeight = window.innerHeight;

    [matchbox, small].forEach((el) => {
      const rect = el.getBoundingClientRect();

      // Find the vertical center of the element
      const elementCenter = rect.top + rect.height / 2;

      // Distance from the center of the browser window
      const distanceFromCenter = Math.abs(elementCenter - viewportHeight / 2);

      // Maximum distance where the element is still affected
      const maxDistance = viewportHeight / 2;

      // 0 = center of window, 1 = top/bottom
      let distance = distanceFromCenter / maxDistance;
      distance = Math.min(Math.max(distance, 0), 1);

      // Center = 0.5 scale
      // Top/bottom = 1 scale
      const scale = 0.5 + 0.5 * distance;

      el.style.transform = `scale(${scale})`;
    });
  }

  window.addEventListener("scroll", updateScale, { passive: true });
  window.addEventListener("resize", updateScale);

  updateScale();
});
