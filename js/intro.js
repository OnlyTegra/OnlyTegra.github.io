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
  const pct = document.getElementById('loading-pct');
  const fill = document.getElementById('loading-fill');
  const nowplaying = document.getElementById('now-playing');
  const loadingBar = document.getElementById('loading-bar');

  intro.classList.add('is-loading');
  loadingBar.style.opacity = '1';
  text.classList.add('fade-out');

  setTimeout(() => {
    text.innerHTML = '<span>caricamento</span>';
    text.classList.remove('fade-out');
    text.classList.add('fade-in');
    if (pct) {
      pct.classList.add('visible');
    }
  }, 260);

  const duration = 10000;
  const startTime = performance.now();

  fill.style.transition = `transform ${duration}ms cubic-bezier(0.12, 0.8, 0.24, 1)`;

  requestAnimationFrame(() => {
    fill.style.transform = 'scaleX(1)';
  });

  let finished = false;

  function tickPercentage(now) {
    if (finished) return;
    const elapsed = Math.min(duration, now - startTime);
    const ratio = elapsed / duration;
    // Strong deceleration curve matching cubic-bezier(0.12, 0.8, 0.24, 1)
    const eased = 1 - Math.pow(1 - ratio, 2.55);
    const val = Math.min(100, Math.floor(eased * 100));
    if (pct) {
      pct.textContent = `${String(val).padStart(2, '0')}%`;
    }
    if (elapsed < duration) {
      requestAnimationFrame(tickPercentage);
    } else if (pct) {
      pct.textContent = '100%';
    }
  }
  requestAnimationFrame(tickPercentage);

  function completeIntro() {
    if (finished) return;
    finished = true;

    if (pct) {
      pct.textContent = '100%';
    }

    setTimeout(() => {
      intro.classList.add('hide');
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-opening');

      if (nowplaying) {
        setTimeout(() => {
          nowplaying.classList.add('show');
        }, 450);
      }

      setTimeout(() => {
        intro.style.display = 'none';
        document.body.classList.remove('intro-opening');
        if (window.AOS) {
          window.AOS.refresh();
        }
      }, 1250);
    }, 180);
  }

  fill.addEventListener('transitionend', function handler(e) {
    if (e.propertyName !== 'transform') return;
    fill.removeEventListener('transitionend', handler);
    completeIntro();
  });

  setTimeout(completeIntro, duration + 250);
}
