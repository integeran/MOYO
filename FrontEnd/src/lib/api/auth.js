import client from './client';

export const login = ({ provider, socialId }) =>
  client.post('/user/issueToken', { provider, socialId });

export const register = ({ provider, socialId, age, gender, nickname }) =>
  client.post('/user/register', {
    provider,
    socialId,
    age,
    gender,
    nickname,
  });
