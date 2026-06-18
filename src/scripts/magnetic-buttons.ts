export function initMagneticButtons(): void {
  const btns = document.querySelectorAll<HTMLElement>(".btn-rose,.btn-ghost-v");
  btns.forEach((btn) => {
    btn.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 80) {
        const strength = 0.15;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}
