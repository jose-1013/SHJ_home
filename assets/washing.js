(function () {
  const canvas = document.getElementById('c');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 480, H = 520, CX = 240, CY = 265, R = 180;
  let drumAngle = 0, drumVel = 0, isDragging = false, lastAngle = 0, lastTime = performance.now();

  function getAngle(e) {
    const rect = canvas.getBoundingClientRect();
    const sx = W / rect.width, sy = H / rect.height;
    let cx, cy;
    if (e.touches) { cx = e.touches[0].clientX; cy = e.touches[0].clientY; }
    else { cx = e.clientX; cy = e.clientY; }
    return Math.atan2((cy - rect.top) * sy - CY, (cx - rect.left) * sx - CX);
  }
  canvas.addEventListener('mousedown', e => { isDragging = true; lastAngle = getAngle(e); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('touchstart', e => { e.preventDefault(); isDragging = true; lastAngle = getAngle(e); }, { passive: false });
  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const a = getAngle(e); let da = a - lastAngle;
    if (da > Math.PI) da -= Math.PI * 2; if (da < -Math.PI) da += Math.PI * 2;
    drumVel = da * 0.9; drumAngle += da; lastAngle = a;
  });
  canvas.addEventListener('touchmove', e => {
    e.preventDefault(); if (!isDragging) return;
    const a = getAngle(e); let da = a - lastAngle;
    if (da > Math.PI) da -= Math.PI * 2; if (da < -Math.PI) da += Math.PI * 2;
    drumVel = da * 0.9; drumAngle += da; lastAngle = a;
  }, { passive: false });
  window.addEventListener('mouseup', () => { isDragging = false; canvas.style.cursor = 'grab'; });
  window.addEventListener('touchend', () => { isDragging = false; });

  const PAL = [
    { f: '#FF5252', s: '#B71C1C' },
    { f: '#448AFF', s: '#0D47A1' },
    { f: '#FFD740', s: '#E65100' },
    { f: '#00E676', s: '#1B5E20' },
    { f: '#EA80FC', s: '#6A1B9A' },
    { f: '#FF6E40', s: '#BF360C' },
  ];

  function drawPants(c, f, s, sc) {
    const w = 70 * sc, h = 64 * sc;
    c.fillStyle = f; c.strokeStyle = s; c.lineWidth = 3;
    c.beginPath();
    c.moveTo(-w * .76, -h * .7); c.lineTo(w * .76, -h * .7);
    c.lineTo(w * .84, 0); c.lineTo(w * .16, 0);
    c.lineTo(w * .2, h * .74); c.lineTo(-w * .2, h * .74);
    c.lineTo(-w * .16, 0); c.lineTo(-w * .84, 0);
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = s; c.fillRect(-w * .76, -h * .7, w * 1.52, h * .18);
    c.strokeStyle = 'rgba(255,255,255,0.45)'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(0, -h * .4); c.lineTo(0, 0); c.stroke();
  }
  function drawUnderwear(c, f, s, sc) {
    const w = 72 * sc, h = 60 * sc;
    c.fillStyle = f; c.strokeStyle = s; c.lineWidth = 3;
    c.beginPath();
    c.moveTo(-w * .77, -h * .64); c.lineTo(w * .77, -h * .64);
    c.lineTo(w * .69, h * .05);
    c.quadraticCurveTo(w * .35, h * .82, 0, h * .5);
    c.quadraticCurveTo(-w * .35, h * .82, -w * .69, h * .05);
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = s;
    c.beginPath();
    c.moveTo(-w * .77, -h * .64); c.lineTo(w * .77, -h * .64);
    c.lineTo(w * .69, -h * .3); c.lineTo(-w * .69, -h * .3); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(-w * .5, -h * .12); c.lineTo(w * .5, -h * .12); c.stroke();
  }
  function drawTshirt(c, f, s, sc) {
    const w = 74 * sc, h = 68 * sc;
    c.fillStyle = f; c.strokeStyle = s; c.lineWidth = 3;
    c.beginPath();
    c.moveTo(-w * .78, -h * .64);
    c.lineTo(-w * .44, -h * .64); c.quadraticCurveTo(-w * .24, -h * .18, 0, -h * .36);
    c.quadraticCurveTo(w * .24, -h * .18, w * .44, -h * .64);
    c.lineTo(w * .78, -h * .64); c.lineTo(w * .93, -h * .16); c.lineTo(w * .63, 0);
    c.lineTo(w * .63, h * .72); c.lineTo(-w * .63, h * .72);
    c.lineTo(-w * .63, 0); c.lineTo(-w * .93, -h * .16);
    c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,0.3)'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(-w * .1, h * .08); c.lineTo(-w * .1, h * .55); c.stroke();
    c.beginPath(); c.moveTo(w * .1, h * .08); c.lineTo(w * .1, h * .55); c.stroke();
  }
  function drawTank(c, f, s, sc) {
    const w = 64 * sc, h = 72 * sc;
    c.fillStyle = f; c.strokeStyle = s; c.lineWidth = 3;
    c.beginPath();
    c.moveTo(-w * .65, -h * .69);
    c.quadraticCurveTo(-w * .48, -h * .85, -w * .26, -h * .65);
    c.quadraticCurveTo(-w * .08, -h * .35, 0, -h * .42);
    c.quadraticCurveTo(w * .08, -h * .35, w * .26, -h * .65);
    c.quadraticCurveTo(w * .48, -h * .85, w * .65, -h * .69);
    c.lineTo(w * .65, h * .69); c.lineTo(-w * .65, h * .69);
    c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-w * .3, h * .1); c.lineTo(w * .3, h * .1); c.stroke();
    c.beginPath(); c.moveTo(-w * .3, h * .3); c.lineTo(w * .3, h * .3); c.stroke();
  }

  const DRAW = [drawPants, drawUnderwear, drawTshirt, drawTank];

  const INIT_POS = [
    { x: -62, y: -55 }, { x: 62, y: -55 },
    { x: -75, y: 45 }, { x: 75, y: 45 },
    { x: 0, y: -100 }, { x: 0, y: 95 },
  ];

  class Cloth {
    constructor(i) {
      this.x = CX + INIT_POS[i].x;
      this.y = CY + INIT_POS[i].y;
      this.vx = 0; this.vy = 0;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = 0;
      this.type = i % 4;
      this.p = PAL[i];
      this.sc = 1.0 + Math.random() * 0.15;
      this.r = 62 * this.sc;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.shadowColor = 'rgba(0,0,0,0.22)'; ctx.shadowBlur = 7;
      DRAW[this.type](ctx, this.p.f, this.p.s, this.sc);
      ctx.restore();
    }
  }

  const clothes = Array.from({ length: 6 }, (_, i) => new Cloth(i));
  const DEAD = 0.0018;

  function physics(dt) {
    const spd = Math.abs(drumVel);
    const moving = spd > DEAD;

    for (let i = 0; i < clothes.length; i++) {
      const cl = clothes[i];

      if (!moving) {
        cl.vy += 0.35;
        cl.vx *= 0.82; cl.vy *= 0.82;
      } else {
        const dx = cl.x - CX, dy = cl.y - CY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = dx / dist, ny = dy / dist;
        cl.vy += 0.42;
        cl.vx += (-ny * drumVel * 22) * dt * 60;
        cl.vy += (nx * drumVel * 22) * dt * 60;
        cl.vx += nx * spd * 100 * dt * 0.5;
        cl.vy += ny * spd * 100 * dt * 0.5;
        cl.vx *= 0.86; cl.vy *= 0.86;
      }

      cl.x += cl.vx; cl.y += cl.vy;

      const innerR = R - cl.r * 0.48;
      const ndx = cl.x - CX, ndy = cl.y - CY;
      const nd = Math.sqrt(ndx * ndx + ndy * ndy);
      if (nd > innerR) {
        const nnx = ndx / nd, nny = ndy / nd;
        cl.x = CX + nnx * innerR; cl.y = CY + nny * innerR;
        const dot = cl.vx * nnx + cl.vy * nny;
        cl.vx -= 1.5 * dot * nnx; cl.vy -= 1.5 * dot * nny;
        cl.vx *= 0.4; cl.vy *= 0.4;
        if (moving) cl.spin += (Math.random() - .5) * 0.08;
      }

      for (let j = i + 1; j < clothes.length; j++) {
        const b = clothes[j];
        const cdx = b.x - cl.x, cdy = b.y - cl.y;
        const cd = Math.sqrt(cdx * cdx + cdy * cdy);
        const minD = (cl.r + b.r) * 0.5;
        if (cd < minD && cd > 0.1) {
          const push = (minD - cd) * 0.35;
          const cnx = cdx / cd, cny = cdy / cd;
          cl.x -= cnx * push; cl.y -= cny * push;
          b.x += cnx * push; b.y += cny * push;
          const dvd = (b.vx - cl.vx) * cnx + (b.vy - cl.vy) * cny;
          if (dvd < 0) {
            cl.vx += dvd * cnx * 0.4; cl.vy += dvd * cny * 0.4;
            b.vx -= dvd * cnx * 0.4; b.vy -= dvd * cny * 0.4;
          }
        }
      }

      if (moving) {
        cl.angle += cl.spin + drumVel * 0.18;
        cl.spin *= 0.97;
      } else {
        cl.spin *= 0.85;
        cl.angle += cl.spin;
      }
    }

    if (!isDragging) {
      drumVel *= 0.978;
      if (Math.abs(drumVel) < DEAD) drumVel = 0;
    }
    drumAngle += drumVel;
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#dde4ec'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#c8d4de'; ctx.strokeStyle = '#8fa4b4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(CX - 215, CY - 235, 430, 465, 18);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#222d3a';
    ctx.beginPath(); ctx.arc(CX, CY, R + 11, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#f5f8fc';
    ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill();

    ctx.save(); ctx.translate(CX, CY); ctx.rotate(drumAngle);
    ctx.strokeStyle = 'rgba(160,175,190,0.3)'; ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * R * .18, Math.sin(a) * R * .18);
      ctx.lineTo(Math.cos(a) * R * .94, Math.sin(a) * R * .94);
      ctx.stroke();
    }
    for (let ri = 1; ri <= 3; ri++) {
      ctx.beginPath(); ctx.arc(0, 0, R * ri * .28, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.translate(CX, CY);
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.clip();
    ctx.translate(-CX, -CY);
    for (const cl of clothes) cl.draw();
    ctx.restore();

    ctx.save(); ctx.translate(CX, CY);
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2);
    const gl = ctx.createRadialGradient(-55, -65, 8, 0, 0, R);
    gl.addColorStop(0, 'rgba(255,255,255,0.18)');
    gl.addColorStop(.5, 'rgba(200,220,255,0.03)');
    gl.addColorStop(1, 'rgba(100,130,160,0.12)');
    ctx.fillStyle = gl; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(-52, -62, 24, Math.PI * 1.1, Math.PI * 1.75);
    ctx.strokeStyle = 'rgba(255,255,255,0.28)'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();
    ctx.restore();
  }

  function loop(ts) {
    const dt = Math.min((ts - lastTime) / 1000, 0.05);
    lastTime = ts; render(); physics(dt);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
