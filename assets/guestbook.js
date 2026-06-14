document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gbForm');
  const nameInput = document.getElementById('gbName');
  const msgInput = document.getElementById('gbMessage');
  const list = document.getElementById('gbList');
  const empty = document.getElementById('gbEmpty');
  const KEY = 'jose_guestbook';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  }

  function save(entries) {
    localStorage.setItem(KEY, JSON.stringify(entries));
  }

  function render() {
    const entries = load();
    list.innerHTML = '';
    empty.classList.toggle('is-hidden', entries.length > 0);

    entries.slice().reverse().forEach(entry => {
      const div = document.createElement('div');
      div.className = 'gb-item';
      div.innerHTML = `
        <div class="gb-item-head">
          <span class="gb-item-name">${escapeHtml(entry.name || '익명')}</span>
          <span class="gb-item-date">${entry.date}</span>
        </div>
        <div class="gb-item-msg">${escapeHtml(entry.message)}</div>
      `;
      list.appendChild(div);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value.trim();
    if (!message) return;

    const entries = load();
    entries.push({
      name: nameInput.value.trim(),
      message,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    });
    save(entries);
    nameInput.value = '';
    msgInput.value = '';
    render();
  });

  render();
});
