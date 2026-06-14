document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.board-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      body.classList.toggle('is-open');
    });
  });
});
