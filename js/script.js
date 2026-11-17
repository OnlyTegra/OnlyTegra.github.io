const wowtitle = document.getElementById('wow-title');
const classText = document.getElementById('class-text');
const specText = document.getElementById('spec-text');
const factionText = document.getElementById('faction-text');
const raiderioScore = document.getElementById('raiderio-score');
const gearScore = document.getElementById('gear-score');

const wowName = 'tegra';
const wowRealm = 'pozzo-delleternità';

fetch(`https://raider.io/api/v1/characters/profile?region=eu&realm=${encodeURIComponent(wowRealm)}&name=${encodeURIComponent(wowName)}&fields=gear%2Cmythic_plus_best_runs%2Cmythic_plus_scores_by_season%3Acurrent`)
  .then(response => {
    if (!response.ok) throw new Error('Raider.io status ' + response.status);
    return response.json();
  })
  .then(data => {
    if (wowtitle && data.name) {
      wowtitle.innerHTML = `${data.name} - ${data.realm}`;
    }
    if (classText && data.class) {
      classText.textContent = data.class === 'Death Knight' ? 'Cavaliere della Morte' : data.class;
    }
    if (specText && data.active_spec_name) {
      specText.textContent = data.active_spec_name === 'Unholy' ? 'Empietà' : data.active_spec_name;
    }
    if (factionText && data.faction) {
      factionText.textContent = data.faction === 'horde' ? 'Orda' : data.faction === 'alliance' ? 'Alleanza' : data.faction;
    }
    if (raiderioScore && data.mythic_plus_scores_by_season && data.mythic_plus_scores_by_season[0]) {
      raiderioScore.textContent = data.mythic_plus_scores_by_season[0].scores.all;
    }
    if (gearScore && data.gear) {
      gearScore.textContent = data.gear.item_level_equipped;
    }
  })
  .catch(err => console.warn('Errore caricamento Raider.io:', err));

const buttonLinks = {
  BtnTelegram: 'https://t.me/OnlyTegra',
  BtnGithub: 'https://github.com/OnlyTegra',
  BtnYoutube: 'https://www.youtube.com/@OnlyTegra',
  BtnInstagram: 'https://www.instagram.com/onlytegra',
  BtnSteam: 'https://steamcommunity.com/id/realtegra/',
  BtnTiktok: 'https://www.tiktok.com/@.t3gr4',
  BtnDiscord: 'https://discord.gg/xv2Pz32sxE',
  BtnRepo1: 'https://github.com/OnlyTegra/TryParse.h',
  BtnRepo2: 'https://github.com/OnlyTegra/DateTime.h',
  BtnRepo3: 'https://github.com/OnlyTegra/Libreria-Giochi',
  BtnRepo4: 'https://github.com/OnlyTegra/Subnetter',
  BtnWowProfile: 'https://raider.io/characters/eu/pozzo-delleternit%C3%A0/Tegra',
  BtnFortniteProfile: 'https://fortnitetracker.com/profile/all/TEGRA%20NEED%20TOKEN'
};

Object.entries(buttonLinks).forEach(([id, url]) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        window.open(buttonLinks[id], '_blank', 'noopener,noreferrer');
      }, 200);
    });
  }
});

// =========================================================
// FORTNITE STATS (stats.json aggiornato ogni 6h via GitHub Action)
// =========================================================
(function initFortniteStats() {
  const fnTitle = document.getElementById('fn-title');
  const fnSyncLabel = document.getElementById('fn-sync-label');
  const fnBpBadge = document.getElementById('fn-bp-badge');
  const fnBpProgressText = document.getElementById('fn-bp-progress-text');
  const fnBpLevel = document.getElementById('fn-bp-level');
  const fnBpBar = document.getElementById('fn-bp-bar');
  const fnPlaytime = document.getElementById('fn-playtime');
  const fnMatches = document.getElementById('fn-matches');
  const fnKills = document.getElementById('fn-kills');
  const fnWins = document.getElementById('fn-wins');
  const fnWinrate = document.getElementById('fn-winrate');
  const fnKd = document.getElementById('fn-kd');
  const fnKpm = document.getElementById('fn-kpm');
  const fnTopALabel = document.getElementById('fn-topA-label');
  const fnTopAVal = document.getElementById('fn-topA-val');
  const fnTopBLabel = document.getElementById('fn-topB-label');
  const fnTopBVal = document.getElementById('fn-topB-val');
  const fnScore = document.getElementById('fn-score');

  const platformTabs = document.querySelectorAll('#fn-platform-tabs .fn-tab');
  const modeTabs = document.querySelectorAll('#fn-mode-tabs .fn-tab');

  let fnData = null;
  let currentPlatform = 'all';
  let currentMode = 'overall';

  const fmtInt = n => Number(n ?? 0).toLocaleString('it-IT');
  const fmtDec = (n, digits = 2) =>
    Number(n ?? 0).toLocaleString('it-IT', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });

  function formatPlaytime(minutes) {
    const totalMins = Number(minutes ?? 0);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (hours <= 0) return `${mins}m`;
    return `${fmtInt(hours)}h ${mins}m`;
  }

  function formatSyncDate(isoString) {
    if (!isoString) return 'Fortnite-API · Sync 6h';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'Fortnite-API · Sync 6h';
    const formatted = d.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `Aggiornato: ${formatted}`;
  }

  function updateAvailableTabs() {
    if (!fnData || !fnData.stats) return;

    platformTabs.forEach(btn => {
      const plat = btn.dataset.platform;
      const exists = Boolean(fnData.stats[plat]);
      btn.disabled = !exists;
      btn.classList.toggle('active', plat === currentPlatform);
    });

    const platData = fnData.stats[currentPlatform] || {};
    if (!platData[currentMode]) {
      currentMode = platData.overall ? 'overall' : Object.keys(platData)[0] || 'overall';
    }

    modeTabs.forEach(btn => {
      const mode = btn.dataset.mode;
      const exists = Boolean(platData[mode]);
      btn.disabled = !exists;
      btn.classList.toggle('active', mode === currentMode);
    });
  }

  function renderFortniteStats() {
    if (!fnData) return;

    // Account & Battle Pass
    if (fnData.account && fnData.account.name) {
      if (fnTitle) fnTitle.textContent = fnData.account.name;
      buttonLinks.BtnFortniteProfile = `https://fortnitetracker.com/profile/all/${encodeURIComponent(fnData.account.name)}`;
    }

    if (fnData.battlePass) {
      const lvl = fnData.battlePass.level ?? 0;
      const prog = Math.min(100, Math.max(0, Number(fnData.battlePass.progress ?? 0)));
      if (fnBpBadge) fnBpBadge.textContent = `Lv. ${fmtInt(lvl)}`;
      if (fnBpProgressText) fnBpProgressText.textContent = `${prog}%`;
      if (fnBpLevel) fnBpLevel.textContent = `Lv. ${fmtInt(lvl)} (${prog}%)`;
      if (fnBpBar) fnBpBar.style.width = `${prog}%`;
    }

    updateAvailableTabs();

    const platObj = (fnData.stats && fnData.stats[currentPlatform]) || {};
    const modeStats = platObj[currentMode] || platObj.overall;
    if (!modeStats) return;

    if (fnSyncLabel) {
      fnSyncLabel.textContent = formatSyncDate(modeStats.lastModified);
    }

    if (fnPlaytime) fnPlaytime.textContent = formatPlaytime(modeStats.minutesPlayed);
    if (fnMatches) fnMatches.textContent = fmtInt(modeStats.matches);
    if (fnKills) fnKills.textContent = fmtInt(modeStats.kills);

    if (fnWins) fnWins.textContent = fmtInt(modeStats.wins);
    if (fnWinrate) fnWinrate.textContent = `Win Rate: ${fmtDec(modeStats.winRate)}%`;

    if (fnKd) fnKd.textContent = fmtDec(modeStats.kd);
    if (fnKpm) fnKpm.textContent = `${fmtDec(modeStats.killsPerMatch)} Kill / Match`;

    if (fnScore) fnScore.textContent = fmtInt(modeStats.score);

    // Dynamic Top Placements based on selected mode
    if (currentMode === 'solo') {
      if (fnTopALabel) fnTopALabel.textContent = '🥇 Piazzamenti Top 10';
      if (fnTopAVal) fnTopAVal.textContent = fmtInt(modeStats.top10);
      if (fnTopBLabel) fnTopBLabel.textContent = '🏅 Piazzamenti Top 25';
      if (fnTopBVal) fnTopBVal.textContent = fmtInt(modeStats.top25);
    } else if (currentMode === 'duo') {
      if (fnTopALabel) fnTopALabel.textContent = '🥇 Piazzamenti Top 5';
      if (fnTopAVal) fnTopAVal.textContent = fmtInt(modeStats.top5);
      if (fnTopBLabel) fnTopBLabel.textContent = '🏅 Piazzamenti Top 12';
      if (fnTopBVal) fnTopBVal.textContent = fmtInt(modeStats.top12);
    } else if (currentMode === 'squad') {
      if (fnTopALabel) fnTopALabel.textContent = '🥇 Piazzamenti Top 3';
      if (fnTopAVal) fnTopAVal.textContent = fmtInt(modeStats.top3);
      if (fnTopBLabel) fnTopBLabel.textContent = '🏅 Piazzamenti Top 6';
      if (fnTopBVal) fnTopBVal.textContent = fmtInt(modeStats.top6);
    } else if (currentMode === 'ltm') {
      if (fnTopALabel) fnTopALabel.textContent = '🔥 Score / Partita';
      if (fnTopAVal) fnTopAVal.textContent = fmtDec(modeStats.scorePerMatch, 1);
      if (fnTopBLabel) fnTopBLabel.textContent = '🛡️ Sopravvissuti';
      if (fnTopBVal) fnTopBVal.textContent = fmtInt(modeStats.playersOutlived);
    } else {
      // overall: show combined podium/top placements
      const topHigh = (modeStats.top3 ?? 0) + (modeStats.top5 ?? 0) + (modeStats.top10 ?? 0);
      const topMid = (modeStats.top6 ?? 0) + (modeStats.top12 ?? 0) + (modeStats.top25 ?? 0);
      if (fnTopALabel) fnTopALabel.textContent = '🥇 Top 3 / 5 / 10';
      if (fnTopAVal) fnTopAVal.textContent = fmtInt(topHigh);
      if (fnTopBLabel) fnTopBLabel.textContent = '🏅 Top 6 / 12 / 25';
      if (fnTopBVal) fnTopBVal.textContent = fmtInt(topMid);
    }
  }

  platformTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      currentPlatform = btn.dataset.platform;
      renderFortniteStats();
    });
  });

  modeTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      currentMode = btn.dataset.mode;
      renderFortniteStats();
    });
  });

  fetch(`./stats.json?t=${Date.now()}`, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('Fortnite stats status ' + response.status);
      return response.json();
    })
    .then(json => {
      const payload = json && json.data ? json.data : json;
      if (payload && payload.stats) {
        fnData = payload;
        renderFortniteStats();
      }
    })
    .catch(err => console.warn('Errore caricamento stats.json Fortnite:', err));
})();

// Subtle border/surface highlight on card hover
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// Enhanced Custom Animated Background (Particles + Interactive Constellation + Shooting Stars + Cursor Nebula)
(function initCustomBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  window.addEventListener('mousemove', e => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const palette = [
    { r: 168, g: 85, b: 247 },  // Neon Purple
    { r: 216, g: 180, b: 254 }, // Soft Lavender
    { r: 59, g: 130, b: 246 },  // Electric Blue
    { r: 99, g: 102, b: 241 },  // Indigo
    { r: 232, g: 121, b: 249 }  // Fuchsia Glow
  ];

  const particleCount = Math.min(85, Math.floor((width * height) / 16000));
  const particles = Array.from({ length: particleCount }, () => {
    const color = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.2 + 0.9,
      baseAlpha: Math.random() * 0.55 + 0.25,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
      color
    };
  });

  // Shooting stars / cyber meteors
  const meteors = [];
  function spawnMeteor() {
    if (meteors.length >= 3) return;
    const startX = Math.random() * width * 0.9;
    const startY = Math.random() * height * 0.4;
    const angle = Math.PI / 5 + (Math.random() - 0.5) * 0.2;
    const speed = 7 + Math.random() * 5;
    meteors.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: 90 + Math.random() * 70,
      alpha: 1,
      decay: 0.012 + Math.random() * 0.008
    });
  }

  setInterval(() => {
    if (Math.random() < 0.75) spawnMeteor();
  }, 2200);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Smooth cursor interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.12;
    mouse.y += (mouse.targetY - mouse.y) * 0.12;

    // Draw interactive cursor aura
    if (mouse.x > 0 && mouse.y > 0) {
      const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
      aura.addColorStop(0, 'rgba(168, 85, 247, 0.14)');
      aura.addColorStop(0.5, 'rgba(59, 130, 246, 0.06)');
      aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 260, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw & update particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulsePhase += p.pulseSpeed;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const dxMouse = p.x - mouse.x;
      const dyMouse = p.y - mouse.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      const boost = distMouse < 200 ? (1 - distMouse / 200) * 0.5 : 0;

      const pulse = Math.sin(p.pulsePhase) * 0.18;
      const alpha = Math.min(1, Math.max(0.15, p.baseAlpha + pulse + boost));
      const { r, g, b } = p.color;

      // Soft outer glow around bright particles
      ctx.beginPath();
      ctx.arc(p.x, p.y, (p.radius + boost * 2) * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.18})`;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + boost * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();

      // Connect to cursor if close
      if (distMouse < 175) {
        const mAlpha = (1 - distMouse / 175) * 0.28;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(192, 132, 252, ${mAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 145) {
          const lineAlpha = (1 - dist / 145) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    // Draw & update shooting stars / meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.alpha -= m.decay;

      if (m.alpha <= 0 || m.x > width + 200 || m.y > height + 200) {
        meteors.splice(i, 1);
        continue;
      }

      const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
      const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

      const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      grad.addColorStop(0, `rgba(240, 210, 255, ${m.alpha})`);
      grad.addColorStop(0.3, `rgba(168, 85, 247, ${m.alpha * 0.7})`);
      grad.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Meteor head glow
      ctx.beginPath();
      ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
