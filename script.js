// Highlight active nav item
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});
