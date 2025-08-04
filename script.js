// Highlight active nav item
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});

function spawnComet() {
  const comet = document.createElement('div');
  comet.classList.add('comet');
  comet.style.top = `${Math.random() * window.innerHeight * 0.3}px`;
  comet.style.left = `${Math.random() * window.innerWidth * 0.3}px`;

  document.querySelector('.comet-container').appendChild(comet);

  setTimeout(() => comet.remove(), 2000);
}

// Rare random chance every 5–10s
setInterval(() => {
  if (Math.random() < 0.1) spawnComet();
}, 5000);
