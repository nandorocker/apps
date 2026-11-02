const demo = document.querySelector('.demo');
const button = document.querySelector('#tidy-button');
const status = document.querySelector('#demo-status');

if (demo && button && status) {
  button.hidden = false;
  button.addEventListener('click', () => {
    const clean = demo.classList.toggle('is-clean');
    button.innerHTML = clean ? 'Replay the demo <span aria-hidden="true">↺</span>' : 'Try a little tidy-up <span aria-hidden="true">✦</span>';
    status.textContent = clean
      ? 'Two example dead ends moved to Deleted Bookmarks. Two favorites kept!'
      : 'Two keepers. Two dead ends. A fresh start waiting.';
  });
}
