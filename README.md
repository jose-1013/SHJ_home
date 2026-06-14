# Jose's 미니홈피

성신여대 AI융합학부 학생 Jose의 개인 GitHub Pages 홈페이지입니다.
싸이월드/PC통신 감성의 픽셀 미니룸 컨셉으로 만들었습니다.

## 페이지 구성

- `index.html` — 메인 (프로필 + 클릭 가능한 픽셀 미니룸)
- `about.html` — 자기소개 다이어리 (페이지 넘기기)
- `projects.html` — 프로젝트 게시판 (클릭해서 펼치기)
- `fun.html` — 잡동사니 (도토리 운세, 숫자 맞추기, 도장 찍기)
- `guestbook.html` — 일촌평 (브라우저 localStorage에 저장되는 방명록)

## 배포 방법

1. GitHub에서 `username.github.io` 이름으로 새 저장소를 만듭니다.
   (이미 다른 이름의 저장소를 쓰고 싶다면 Settings → Pages에서 별도 설정 가능)
2. 이 폴더의 모든 파일을 저장소 루트에 복사합니다.
3. 커밋 후 푸시:
   ```
   git add .
   git commit -m "Jose's 미니홈피 초기 버전"
   git push origin main
   ```
4. 저장소 Settings → Pages에서 Source를 `main` 브랜치, 루트(`/`)로 설정합니다.
5. 몇 분 후 `https://username.github.io` 에서 확인 가능합니다.

## 수정 포인트

- 색상/폰트: `assets/style.css` 상단 `:root` 변수
- 프로필/소개 글: `index.html`, `about.html` 텍스트
- 프로젝트 목록: `projects.html`의 `.board-row` 항목 추가/수정
- 새 페이지 추가 시: 다른 페이지의 `<nav>` 블록을 복사해서 동일하게 추가

## 로컬에서 확인하기

별도 서버 없이 `index.html`을 브라우저로 열면 바로 동작합니다.
(단, 폰트는 인터넷 연결이 필요합니다)
