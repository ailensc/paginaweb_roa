export function initModelViewerSetup(): void {
  document.querySelectorAll("model-viewer").forEach((mv) => {
    mv.addEventListener("load", () => {
      const names = (mv as any).availableAnimations as string[];
      if (names && names.length > 0) {
        const currentAnim = mv.getAttribute("animation-name");
        if (!currentAnim || currentAnim === "All") {
          (mv as any).animationName = names[0];
        }
        setTimeout(() => {
          try {
            (mv as any).play?.();
          } catch (_) {}
        }, 100);
      }
    });
  });
}
