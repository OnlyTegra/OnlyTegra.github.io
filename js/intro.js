let loadingStarted = false;
let barLoading = false;
let playerReady = false;
let player;

function initPlayer() {
  player = new YT.Player('player', {
    videoId: '0HhBEfz_Ycg',
    playerVars: {
      autoplay: 0,
      controls: 0
    },
    events: {
      onReady: function (event) {
        playerReady = true;
      }
    }
  });
}

if (window.YT && window.YT.Player) {
  initPlayer();
} else {

  window.onYouTubeIframeAPIReady = initPlayer;

  if (!loadingStarted) {
    loadingStarted = true;
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }
}

function startExperience() {

  if (playerReady && player) {
    player.playVideo();
  } else {
    console.log("player non pronto");
    return;
  }

  if (barLoading) return;
  barLoading = true;

  const intro = document.getElementById("intro");
  const text = document.getElementById("loading-text");
  const fill = document.getElementById("loading-fill");
  const nowplaying = document.getElementById("now-playing");
  const loadingBar = document.getElementById("loading-bar");

  loadingBar.style.opacity = "1";

  text.classList.add("fade-out");

  setTimeout(() => {
    text.innerText = "Caricamento...";
    text.classList.remove("fade-out");
    text.classList.add("fade-in");
  }, 300);

  const duration = 10000;
  const startTime = Date.now();

  const interval = setInterval(() => {
    let progress = (Date.now() - startTime) / duration;
    if (progress > 1) progress = 1;

    fill.style.width = (progress * 100) + "%";

    const red = Math.floor(255 - (255 - 180) * progress);
    const green = Math.floor(255 * (1 - progress));
    const blue = 255;

    text.style.color = `rgb(${red}, ${green}, ${blue})`;
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