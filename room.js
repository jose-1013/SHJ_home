document.addEventListener('DOMContentLoaded', () => {
  const hint = document.getElementById('roomHint');
  const items = document.querySelectorAll('.room-item');

  items.forEach(item => {
    const label = item.getAttribute('data-label');
    item.addEventListener('mouseenter', () => {
      if (hint) hint.textContent = label;
    });
    item.addEventListener('mouseleave', () => {
      if (hint) hint.textContent = '가구에 마우스를 올리면 안내가 나와요!';
    });
    item.addEventListener('focus', () => {
      if (hint) hint.textContent = label;
    });
  });

  // 화분 클릭 -> 토스트
  const plantBtn = document.getElementById('plantBtn');
  const toast = document.getElementById('plantToast');
  if (plantBtn && toast) {
    plantBtn.addEventListener('click', () => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1800);
    });
  }
});
