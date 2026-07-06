let loadingStarted = false;

function startExperience() {
  if (loadingStarted) return; // evita doppio click
  loadingStarted = true;

  const intro = document.getElementById("intro");
  const site = document.getElementById("site");
  const audio = document.getElementById("bg-music");

  const text = document.getElementById("loading-text");
  const fill = document.getElementById("loading-fill");
  const nowplaying = document.getElementById("now-playing");
  const loadingBar = document.getElementById("loading-bar");


loadingBar.style.opacity = "1";
audio.volume = 0.3;
audio.play();

// 👁️ scompare
text.classList.add("fade-out");

setTimeout(() => {
    // Cambia testo
    text.innerText = "Caricamento...";

    // Riparte il fade
    text.classList.remove("fade-out");
    text.classList.add("fade-in");
}, 300);

  const duration = 10000;
  const startTime = Date.now();

  const interval = setInterval(() => {
    let progress = (Date.now() - startTime) / duration;
    if (progress > 1) progress = 1;

    fill.style.width = (progress * 100) + "%";

    // 🟣 testo che diventa viola acceso
    const red = Math.floor(255 - (255 - 180) * progress);
    const green = Math.floor(255 * (1 - progress));
    const blue = 255;

    text.style.color = `rgb(${red}, ${green}, ${blue})`;

    // Glow viola sempre più intenso
    text.style.textShadow = `0 0 ${20 * progress}px rgba(180, 0, 255, ${progress})`;

    if (progress === 1) {
      clearInterval(interval);

      setTimeout(() => {
        intro.classList.add("hide");

        setTimeout(() => {
          intro.style.display = "none";
          nowplaying.classList.add("show");
        }, 1000);

      }, 300);
    }
  }, 16);
}