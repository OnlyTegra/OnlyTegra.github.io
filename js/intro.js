let barLoading = false;
const bgAudio = document.getElementById('bg-audio') || new Audio('sound/wock.mp3');
bgAudio.loop = true;

function startExperience() {
  if (barLoading) return;
  barLoading = true;

  if (bgAudio) {
    bgAudio.play().catch(e => {
      console.warn('Errore avvio audio:', e);
    });
  }

  const intro = document.getElementById('intro');
  const text = document.getElementById('loading-text');
  const fill = document.getElementById('loading-fill');
  const nowplaying = document.getElementById('now-playing');
  const loadingBar = document.getElementById('loading-bar');

  loadingBar.style.opacity = '1';
  text.classList.add('fade-out');

  setTimeout(() => {
    text.innerText = 'Caricamento...';
    text.classList.remove('fade-out');
    text.classList.add('fade-in');
  }, 300);

  const duration = 10000;

  fill.style.transition = `transform ${duration}ms linear`;
  text.style.transition = `color ${duration}ms linear, text-shadow ${duration}ms linear`;

  requestAnimationFrame(() => {
    fill.style.transform = 'scaleX(1)';
    text.style.color = 'rgb(190, 120, 255)';
    text.style.textShadow = '0 0 18px rgba(180, 0, 255, 0.6)';
  });

  let finished = false;
  function completeIntro() {
    if (finished) return;
    finished = true;

    setTimeout(() => {
      intro.classList.add('hide');

      setTimeout(() => {
        intro.style.display = 'none';
        if (nowplaying) {
          nowplaying.classList.add('show');
        }
        if (window.AOS) {
          window.AOS.refresh();
        }
      }, 900);
    }, 200);
  }

  fill.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;
    fill.removeEventListener('transitionend', handler);
    completeIntro();
  });

  setTimeout(completeIntro, duration + 300);
}
