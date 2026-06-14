document.addEventListener('DOMContentLoaded', () => {

  // ===== 도토리 운세 =====
  const fortunes = [
    '오늘은 버그가 한 번에 잡힐 운입니다.',
    '커피를 한 잔 더 마시면 좋은 일이 생깁니다.',
    'PR 리뷰가 빨리 끝나는 날입니다.',
    '오늘은 새로운 아이디어가 떠오를 확률이 높습니다.',
    '잠깐 산책하면 디버깅 실마리가 보입니다.',
    '오늘 작성한 코드는 내일의 나에게 칭찬받습니다.',
    '평소보다 집중력이 1.5배 올라가는 날.',
    '발표 연습 한 번 더 하면 완벽해집니다.',
  ];
  const fortuneBtn = document.getElementById('fortuneBtn');
  const fortuneResult = document.getElementById('fortuneResult');
  if (fortuneBtn) {
    fortuneBtn.addEventListener('click', () => {
      const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
      fortuneResult.innerHTML = `🌰 <b>오늘의 운세</b>: ${pick}`;
    });
  }

  // ===== 숫자 맞추기 =====
  let target = Math.floor(Math.random() * 10) + 1;
  let tries = 0;
  const guessInput = document.getElementById('guessInput');
  const guessBtn = document.getElementById('guessBtn');
  const guessResult = document.getElementById('guessResult');

  if (guessBtn) {
    guessBtn.addEventListener('click', () => {
      const val = parseInt(guessInput.value, 10);
      if (!val || val < 1 || val > 10) {
        guessResult.textContent = '1~10 사이 숫자를 입력해주세요!';
        return;
      }
      tries += 1;
      if (val === target) {
        guessResult.innerHTML = `🎉 정답입니다! <b>${tries}번</b> 만에 맞췄어요. (새 라운드 시작)`;
        target = Math.floor(Math.random() * 10) + 1;
        tries = 0;
      } else if (val < target) {
        guessResult.innerHTML = `더 큰 숫자예요! (시도 <b>${tries}</b>회)`;
      } else {
        guessResult.innerHTML = `더 작은 숫자예요! (시도 <b>${tries}</b>회)`;
      }
    });
  }

  // ===== 도장 깡깡 =====
  let stamps = parseInt(localStorage.getItem('jose_stamp_count') || '0', 10);
  const stampBtn = document.getElementById('stampBtn');
  const stampCount = document.getElementById('stampCount');
  if (stampCount) stampCount.textContent = stamps;

  if (stampBtn) {
    stampBtn.addEventListener('click', () => {
      stamps += 1;
      stampCount.textContent = stamps;
      localStorage.setItem('jose_stamp_count', stamps);
    });
  }
});
