// ===== 방문자수 카운터 (localStorage 기반) =====
function updateVisitCounter() {
  const el = document.querySelector('#visitCount');
  if (!el) return;
  let count = parseInt(localStorage.getItem('jose_visit_count') || '0', 10);
  count += 1;
  localStorage.setItem('jose_visit_count', count);
  el.textContent = count.toLocaleString();
}

// ===== 현재 페이지 네비 활성화 =====
function highlightActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateVisitCounter();
  highlightActiveNav();
});
