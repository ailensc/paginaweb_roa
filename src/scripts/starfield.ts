export function initStarfield(): void {
  const sf = document.getElementById("sf");
  if (!sf) return;
  for (let i = 0; i < 60; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = Math.random() * 2 + 0.5;
    s.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;top:${Math.random() * 100}%;
      --d:${2 + Math.random() * 4}s;--delay:${Math.random() * 4}s;
      --min:${0.05 + Math.random() * 0.1};--max:${0.5 + Math.random() * 0.5};
    `;
    sf.appendChild(s);
  }
}
