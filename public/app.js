const api = '/api/items';

async function list() {
  const res = await fetch(api);
  const items = await res.json();
  const container = document.getElementById('items');
  container.innerHTML = '';
  for (const it of items) {
    const el = document.createElement('div');
    el.className = 'item';
    el.innerHTML = `<strong>${escapeHtml(it.name)}</strong> <small>#${it.id}</small>
      <p>${escapeHtml(it.description || '')}</p>
      <button data-id="${it.id}" class="del">Delete</button>
      <button data-id="${it.id}" class="edit">Edit</button>`;
    container.appendChild(el);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

document.getElementById('create').addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  if (!name) return alert('name required');
  await fetch(api, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, description }) });
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  list();
});

document.addEventListener('click', async (e) => {
  if (e.target.matches('.del')) {
    const id = e.target.dataset.id;
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    list();
  } else if (e.target.matches('.edit')) {
    const id = e.target.dataset.id;
    const name = prompt('New name');
    if (name === null) return;
    const description = prompt('New description');
    await fetch(`${api}/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, description }) });
    list();
  }
});

list();
