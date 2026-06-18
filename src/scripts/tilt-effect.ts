export function initTiltEffect(): void {
  const tiltEls = document.querySelectorAll<HTMLElement>("[data-tilt]");
  tiltEls.forEach((el) => {
    el.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const rx = dy * -12;
      const ry = dx * 12;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
}
