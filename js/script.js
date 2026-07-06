let wowtitle = document.getElementById("wow-title");
let classText = document.getElementById("class-text");
let specText = document.getElementById("spec-text");
let factionText = document.getElementById("faction-text");
let raiderioScore = document.getElementById("raiderio-score");
let name = "tegra";
let realm = "pozzo-delleternità";
fetch (`https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${name}&fields=mythic_plus_best_runs%2Cmythic_plus_scores_by_season%3Acurrent`)
.then(response => response.json())
.then(data => {
    const firstRun = data.mythic_plus_best_runs[0];
    wowtitle.innerHTML = `<h1>${data.name} - ${data.realm}</h1>`;
    classText.textContent = data.class == "Death Knight" ? "Cavaliere della Morte" : data.class;
    specText.textContent = data.active_spec_name == "Unholy" ? "Empietà" : data.active_spec_name;
    factionText.textContent = data.faction == "horde" ? "Orda" : data.faction == "alliance" ? "Alleanza" : data.faction;
    raiderioScore.textContent = data.mythic_plus_scores_by_season[0].scores.all;
});

document.getElementById("BtnTelegram").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://t.me/OnlyTegra", "_blank");
    }, 550);
});

document.getElementById("BtnGithub").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://github.com/OnlyTegra", "_blank");
    }, 550);
});

document.getElementById("BtnYoutube").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://www.youtube.com/@OnlyTegra", "_blank");
    }, 550);
});

document.getElementById("BtnInstagram").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://www.instagram.com/onlytegra", "_blank");
    }, 550);
});

document.getElementById("BtnTelegram").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://t.me/OnlyTegra", "_blank");
    }, 550);
});

document.getElementById("BtnSteam").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://steamcommunity.com/id/realtegra/", "_blank");
    }, 550);
});

document.getElementById("BtnTiktok").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://www.tiktok.com/@onlytegra", "_blank");
    }, 550);
});

document.getElementById("BtnDiscord").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://discord.gg/xv2Pz32sxE", "_blank");
    }, 550);
});

document.getElementById("BtnRepo1").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://github.com/OnlyTegra/TryParse.h", "_blank");
    }, 550);
});

document.getElementById("BtnRepo2").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://github.com/OnlyTegra/DateTime.h", "_blank");
    }, 550);
});

document.getElementById("BtnRepo3").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://github.com/OnlyTegra/Libreria-Giochi", "_blank");
    }, 550);
});

document.getElementById("BtnRepo4").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://github.com/OnlyTegra/Subnetter", "_blank");
    }, 550);
});

document.getElementById("BtnWowProfile").addEventListener("click", function() {
    setTimeout(function() {
    window.open("https://raider.io/characters/eu/pozzo-delleternit%C3%A0/Tegra", "_blank");
    }, 550);
});