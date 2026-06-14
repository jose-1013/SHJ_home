document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.diary-page');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const dotsWrap = document.getElementById('diaryDots');
  let current = 0;

  // 점 생성
  pages.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('span');

  function render() {
    pages.forEach((p, i) => p.classList.toggle('is-active', i === current));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === pages.length - 1;
  }

  function goTo(i) {
    current = Math.max(0, Math.min(pages.length - 1, i));
    render();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  render();
});
