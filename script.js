// ================================================================
//  David Heffernan – Portfolio JS
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──────────────────────────────────────────
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  // ── Email reveal ─────────────────────────────────────────────
  const emailEl = document.getElementById('email');
  if (emailEl) {
    const user   = 'david.heff.dh+jobs';
    const domain = 'googlemail.com';
    const email  = `${user}@${domain}`;
    emailEl.innerHTML = `<a href="mailto:${email}">${email}</a>`;
  }

  // ── Canvas starfield ─────────────────────────────────────────
  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, stars, shooters;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      const count = Math.floor((W * H) / 4000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2
      }));
      shooters = [];
    }

    function spawnShooter() {
      shooters.push({
        x: Math.random() * W * 0.6,
        y: Math.random() * H * 0.4,
        vx: (Math.random() * 8 + 6),
        vy: (Math.random() * 4 + 2),
        len: Math.random() * 120 + 80,
        alpha: 1,
        life: 0
      });
    }

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      // Stars
      stars.forEach(s => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${a})`;
        ctx.fill();
      });

      // Shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        s.alpha = Math.max(0, 1 - s.life / 50);

        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 8, s.y - s.vy * 8);
        grad.addColorStop(0, `rgba(0,220,255,${s.alpha})`);
        grad.addColorStop(1, 'rgba(0,220,255,0)');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (s.alpha <= 0) shooters.splice(i, 1);
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    // Spawn a shooting star periodically
    setInterval(() => {
      if (Math.random() < 0.4) spawnShooter();
    }, 3500);
  }

  // ── Scroll-reveal ─────────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });

});
