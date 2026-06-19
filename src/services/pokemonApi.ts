import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon',
});

// AUTH
export const register = (username: string, password: string) =>
  api.post('/auth/v1/register', { username, password });

export const login = (username: string, password: string) =>
  api.post('/auth/v1/login', { username, password });

export const getProfile = (userId: string) =>
  api.get(`/auth/v1/stats/${userId}`);

export const updateProfile = (userId: string, data: { level: string; vitorias: string; derrotas: string }) =>
  api.put(`/auth/v1/stats/${userId}`, data);

// POKÉMON
export const getTeam = (userId: string) =>
  
  api.get('/pokemon/v1/team', { params: { 'user-id': userId } });
  
export const updateTeam = (userId: string, removedPokemon: number, newPokemon: number) =>
  api.put('/pokemon/v1/team', {
    removedPokemon,
    newPokemon,
  }, {
    params: {
      'user-id': userId,
    },
  });

export const addCaptured = (userId: string, pokemonId: number) =>
  api.put('/pokemon/v1/captured', null, {
    params: { 'user-id': userId, 'pokemon-id': pokemonId },
  });

export const deleteCaptured = (userId: string, pokemonId: number) =>
  api.delete('/pokemon/v1/captured', {
    params: { 'user-id': userId, 'pokemon-id': pokemonId },
  });