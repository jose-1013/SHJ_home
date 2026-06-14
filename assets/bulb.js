document.addEventListener('DOMContentLoaded', () => {
  const scene = document.getElementById('bulbScene');
  const cord = document.getElementById('bulbCord');
  const hint = document.getElementById('bulbHint');
  if (!scene || !cord) return;

  const hints = {
    on: '줄을 당기면 화면 전체가 어두워져요',
    off: '다시 당기면 불을 켜요',
  };

  function updateHint() {
    const isDark = document.documentElement.classList.contains('dark');
    if (hint) hint.textContent = isDark ? hints.off : hints.on;
  }

  cord.addEventListener('click', () => {
    // 줄 당기는 애니메이션
    cord.classList.add('is-pulling');
    setTimeout(() => cord.classList.remove('is-pulling'), 150);

    // 사이트 전체 다크모드 토글
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('jose_dark_mode', isDark ? '1' : '0');
    updateHint();
  });

  updateHint();
});
