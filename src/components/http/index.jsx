const cache = new Map();

async function get(url) {
  if (cache.has(url)) return cache.get(url);

  const response = await fetch(`https://rickandmortyapi.com/api/${url}`);
  const data = await response.json();
  cache.set(url, data);
  return data;
}

export async function getCharacters() {
  const url = 'character';
  return get(url);
}

export async function getCharacterById(id) {
  const url = `character/${id}`;
  return get(url);
}

export async function getEpisodes() {
  const url = 'episode';
  return get(url);
}

export async function getEpisodeById(id) {
  const url = `episode/${id}`;
  return get(url);
}

export async function getLocations() {
  const url = 'location';
  return get(url);
}

export async function getLocationById(id) {
  const url = `location/${id}`;
  return get(url);
}