export function initDividerParticles(): void {
  const dividerWraps = document.querySelectorAll<HTMLElement>(".divider-wrap");
  dividerWraps.forEach((dw) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    dw.addEventListener("mouseenter", () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          const rect = dw.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          document.dispatchEvent(
            new CustomEvent("dividerBurst", {
              detail: { x: cx + (Math.random() - 0.5) * 60, y: cy },
            })
          );
        }, 50);
      }
    });
    dw.addEventListener("mouseleave", () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
  });
}
