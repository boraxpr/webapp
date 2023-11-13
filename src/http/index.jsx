const cache = new Map();

async function getRickAndMorty(url) {
  if (cache.has(url)) return cache.get(url);

  const response = await fetch(`https://rickandmortyapi.com/api/${url}`);
  const data = await response.json();
  cache.set(url, data);
  return data;
}
async function getUsersInternal(url) {
  // No cache
  cache.delete(url);
  const data = await fetch('http://localhost:3000/api/users');
  return data;
}

export async function getUsers() {
  const url = 'users';
  return getUsersInternal(url);
}

export async function getCharacters(page, name, gender) {
  if (!page) page = 1;
  let url = `character/?page=${page}`;
  if (name) {
    url = url + `&name=${name}`;
  }
  if (gender !== 'all') {
    url = url + `&gender=${gender}`
  }

  return getRickAndMorty(url);
}

export async function getCharacterById(id) {
  const url = `character/${id}`;
  return getRickAndMorty(url);
}

export async function getEpisodes() {
  const url = 'episode';
  return getRickAndMorty(url);
}

export async function getEpisodeById(id) {
  const url = `episode/${id}`;
  return getRickAndMorty(url);
}

export async function getLocations() {
  const url = 'location';
  return getRickAndMorty(url);
}

export async function getLocationById(id) {
  const url = `location/${id}`;
  return getRickAndMorty(url);
}