interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  rotSpeed: number;
  phase: number;
  life: number;
  type: number;
  opacity: number;
  hue: number;
}

interface DividerParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  type: number;
  rot: number;
  rotSpeed: number;
  phase: number;
}

interface DividerBurstObj {
  x: number;
  y: number;
  parts: DividerParticle[];
  update: () => void;
  draw: () => void;
  isDead: () => boolean;
}

let W: number = 0;
let H: number = 0;

const mouse = { x: 0, y: 0, dx: 0, dy: 0 };
const particles: Particle[] = [];
const MAX_P = 60;

const dividerParticles: DividerBurstObj[] = [];
const MAX_DP = 100;
let activeDividers: { y: number; wrap: HTMLElement }[] = [];

let targetSigilRot = 0;
let sigilRot = 0;

class SGparticle implements Particle {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speed: number = 0;
  angle: number = 0;
  rotSpeed: number = 0;
  phase: number = 0;
  life: number = 1;
  type: number = 0;
  opacity: number = 0;
  hue: number = 0;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.x = mouse.x + (Math.random() - 0.5) * 300;
    this.y = mouse.y + (Math.random() - 0.5) * 300;
    this.size = 8 + Math.random() * 14;
    this.speed = 0.5 + Math.random() * 0.8;
    this.angle = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.phase = Math.random() * Math.PI * 2;
    this.life = 1;
    this.type = Math.floor(Math.random() * 3);
    this.opacity = 0.5 + Math.random() * 0.4;
    this.hue = Math.random() * 60 + 320;
  }

  update(): void {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 30) {
      this.x += dx * 0.02;
      this.y += dy * 0.02;
    } else {
      this.x += mouse.dx * 0.3 + Math.cos(this.angle + this.phase) * 0.3;
      this.y += mouse.dy * 0.3 + Math.sin(this.angle + this.phase) * 0.3;
    }

    if (dist < 120) {
      const push = (1 - dist / 120) * 0.4;
      this.x += mouse.dx * push;
      this.y += mouse.dy * push;
    }

    this.angle += this.rotSpeed;
    this.life = Math.min(1, this.life + 0.008);
  }

  draw(): void {
    const canvas = document.getElementById("geo-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = Date.now() * 0.002;
    const pulse = 0.7 + 0.3 * Math.sin(now + this.phase);
    const a = this.opacity * pulse;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.shadowColor =
      this.type === 0
        ? "rgba(196,75,255,0.4)"
        : this.type === 1
          ? "rgba(255,45,138,0.4)"
          : "rgba(214,136,255,0.4)";
    ctx.shadowBlur = 12 + Math.sin(now + this.phase) * 4;

    const r = this.size;
    ctx.lineWidth = 0.8 + Math.sin(now + this.phase) * 0.3;

    if (this.type === 0) {
      ctx.strokeStyle = `rgba(196,75,255,${a})`;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 3) * i - Math.PI / 6;
        const px = Math.cos(ang) * r;
        const py = Math.sin(ang) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = `rgba(196,75,255,${a * 0.04})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255,45,138,${a * 0.3})`;
      ctx.lineWidth = 0.3 + Math.sin(now + this.phase) * 0.2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 3) * i - Math.PI / 6;
        const px = Math.cos(ang) * r * 0.5;
        const py = Math.sin(ang) * r * 0.5;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    } else if (this.type === 1) {
      ctx.strokeStyle = `rgba(255,45,138,${a})`;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(r * 0.8, 0);
      ctx.lineTo(0, r);
      ctx.lineTo(-r * 0.8, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = `rgba(255,45,138,${a * 0.04})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255,133,192,${a * 0.5})`;
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.moveTo(-r * 0.4, 0);
      ctx.lineTo(r * 0.4, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.4);
      ctx.lineTo(0, r * 0.4);
      ctx.stroke();
    } else {
      ctx.strokeStyle = `rgba(214,136,255,${a})`;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,45,138,${a * 0.4})`;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(196,75,255,${a * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-r * 0.8, 0);
      ctx.lineTo(r * 0.8, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.8);
      ctx.lineTo(0, r * 0.8);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,133,192,${a * 0.6})`;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

function spawnParticles(): void {
  if (particles.length < MAX_P && Math.random() < 0.3) {
    particles.push(new SGparticle());
  }
}

function updateParticles(): void {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (
      particles[i].life < 0.01 ||
      particles[i].x < -100 ||
      particles[i].x > W + 100 ||
      particles[i].y < -100 ||
      particles[i].y > H + 100
    ) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles(ctx: CanvasRenderingContext2D): void {
  for (const p of particles) p.draw();
}

class DividerBurst implements DividerBurstObj {
  x: number;
  y: number;
  parts: DividerParticle[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const count = 8 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + Math.random() * Math.PI;
      const speed = 0.8 + Math.random() * 2.2;
      this.parts.push({
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 6 + Math.random() * 12,
        life: 1,
        decay: 0.006 + Math.random() * 0.01,
        type: Math.floor(Math.random() * 3),
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  update(): void {
    for (const p of this.parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.006;
      p.vx *= 0.995;
      p.rot += p.rotSpeed;
      p.life -= p.decay;
    }
  }

  draw(): void {
    const canvas = document.getElementById("geo-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = Date.now() * 0.003;
    for (const p of this.parts) {
      if (p.life <= 0) continue;
      const pulse = 0.7 + 0.3 * Math.sin(now + p.phase);
      const a = p.life * 0.6 * pulse;
      ctx.save();
      ctx.translate(this.x + p.x, this.y + p.y);
      ctx.rotate(p.rot);
      const r = p.size * p.life;
      ctx.lineWidth = 0.8 * p.life;

      ctx.shadowColor = "rgba(255,45,138,0.3)";
      ctx.shadowBlur = 10 + Math.sin(now + p.phase) * 5;

      if (p.type === 0) {
        ctx.strokeStyle = `rgba(196,75,255,${a})`;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const ang = (Math.PI / 3) * i - Math.PI / 6;
          const px = Math.cos(ang) * r;
          const py = Math.sin(ang) * r;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = `rgba(196,75,255,${a * 0.06})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,45,138,${a * 0.5})`;
        ctx.lineWidth = 0.4 * p.life;
        ctx.beginPath();
        ctx.moveTo(-r * 0.6, 0);
        ctx.lineTo(r * 0.6, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.6);
        ctx.lineTo(0, r * 0.6);
        ctx.stroke();
      } else if (p.type === 1) {
        ctx.strokeStyle = `rgba(255,45,138,${a})`;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(r * 0.8, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r * 0.8, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = `rgba(255,45,138,${a * 0.06})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,133,192,${a * 0.5})`;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.strokeStyle = `rgba(214,136,255,${a})`;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(214,136,255,${a * 0.04})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,45,138,${a * 0.5})`;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(196,75,255,${a * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(-r * 0.7, 0);
        ctx.lineTo(r * 0.7, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.7);
        ctx.lineTo(0, r * 0.7);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }

  isDead(): boolean {
    return this.parts.every((p) => p.life <= 0);
  }
}

function updateDividerParticles(): void {
  for (let i = dividerParticles.length - 1; i >= 0; i--) {
    dividerParticles[i].update();
    if (dividerParticles[i].isDead()) {
      dividerParticles.splice(i, 1);
    }
  }
}

function drawDividerParticles(ctx: CanvasRenderingContext2D): void {
  for (const bp of dividerParticles) bp.draw();
}

function animateCanvas(): void {
  const canvas = document.getElementById("geo-canvas") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, W, H);

  sigilRot += (targetSigilRot - sigilRot) * 0.05;
  const sigil = document.getElementById("sigil");
  if (sigil) sigil.style.transform = `rotate(${sigilRot}deg)`;

  spawnParticles();
  updateParticles();
  drawParticles(ctx);
  updateDividerParticles();
  drawDividerParticles(ctx);

  for (const p of particles) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 200) {
      const a = (1 - d / 200) * 0.15;
      ctx.save();
      ctx.shadowColor = `rgba(196,75,255,${a * 0.5})`;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = `rgba(196,75,255,${a})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  requestAnimationFrame(animateCanvas);
}

export function initSacredGeometry(): void {
  const canvas = document.getElementById("geo-canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  function resize(): void {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  mouse.x = W / 2;
  mouse.y = H / 2;

  document.addEventListener("mousemove", (e: MouseEvent) => {
    const px = (e.clientX / W) * 2 - 1;
    const py = (e.clientY / H) * 2 - 1;
    mouse.dx = (e.clientX - mouse.x) * 0.08;
    mouse.dy = (e.clientY - mouse.y) * 0.08;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    targetSigilRot = px * 6;
  });

  // Listen for divider burst events
  document.addEventListener("dividerBurst", ((e: CustomEvent) => {
    if (dividerParticles.length < MAX_DP) {
      dividerParticles.push(new DividerBurst(e.detail.x, e.detail.y));
    }
  }) as EventListener);

  animateCanvas();
}
