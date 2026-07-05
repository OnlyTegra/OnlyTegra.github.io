const username = "onlytegra"; 
fetch(`https://api.github.com/users/${username}`)
  .then(response => response.json())
  .then(data => {
    const stats = document.getElementById("profile-stats");
        stats.innerHTML = `
        <li>🌟 Followers: ${data.followers}</li>
        <li>👥 Following: ${data.following}</li>
        <li>📦 Repos pubblici: ${data.public_repos}</li>
        <li>⭐ Gist pubblici: ${data.public_gists}</li>
        <li>📅 Membro dal: ${new Date(data.created_at).toLocaleDateString()}</li>
        <li>📍 Località: ${data.location ?? "Non specificata"}</li>
    `;
  })
  .catch(err => console.error("Errore nel recupero dati GitHub, che palle:", err));
