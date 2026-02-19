

document.querySelector(".btn-github").addEventListener("click", function () {
    window.open("https://github.com/OnlyTegra", "_blank");
});

document.getElementById("steamBtn").addEventListener("click", function () {

    window.open("https://steamcommunity.com/id/realtegra/", "_blank");

})

document.getElementById("discordBtn").addEventListener("click", function (){
    window.open("https://discord.gg/f8rTD68UP7","_blank");
})

document.getElementById("youtubeBtn").addEventListener("click", function (){
    window.open("https://www.youtube.com/@OnlyTegra","_blank");
})

document.getElementById("instagramBtn").addEventListener("click", function (){
    window.open("https://www.instagram.com/onlytegra/","_blank");
})

const username = "onlytegra"; 
fetch(`https://api.github.com/users/${username}`)
  .then(response => response.json())
  .then(data => {
    const stats = document.getElementById("profile-stats");
    stats.innerHTML = `
      <li>🌟 Followers: ${data.followers}</li>
      <li>👥 Following: ${data.following}</li>
      <li>📦 Repos pubblici: ${data.public_repos}</li>
    `;
  })
  .catch(err => console.error("Errore nel recupero dati GitHub, che palle:", err));
