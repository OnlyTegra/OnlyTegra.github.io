const username = 'onlytegra';

fetch(`https://api.github.com/users/${username}`)
  .then(response => {
    if (!response.ok) throw new Error('GitHub API status ' + response.status);
    return response.json();
  })
  .then(data => {
    const stats = document.getElementById('profile-stats');
    if (!stats) return;

    const createdDate = new Date(data.created_at).toLocaleDateString('it-IT', {
      month: 'short',
      year: 'numeric'
    });

    stats.innerHTML = `
      <li>
        <span class="stat-label">🌟 Followers</span>
        <strong>${data.followers}</strong>
      </li>
      <li>
        <span class="stat-label">👥 Following</span>
        <strong>${data.following}</strong>
      </li>
      <li>
        <span class="stat-label">📦 Repository</span>
        <strong>${data.public_repos}</strong>
      </li>
      <li>
        <span class="stat-label">⭐ Gist pubblici</span>
        <strong>${data.public_gists}</strong>
      </li>
      <li>
        <span class="stat-label">📅 Membro dal</span>
        <strong>${createdDate}</strong>
      </li>
      <li>
        <span class="stat-label">📍 Località</span>
        <strong>${data.location ?? 'Italia'}</strong>
      </li>
    `;
  })
  .catch(err => console.error('Errore nel recupero dati GitHub:', err));
