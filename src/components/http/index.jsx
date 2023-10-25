import axios from 'axios';
const cache = new Map();

export const http = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  timeout: 10000,
});

async function get(url) {
  if (cache.has(url)) return cache.get(url);

  const response = (await http.get(url)).data;
  cache.set(url, response);
  return response;
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
