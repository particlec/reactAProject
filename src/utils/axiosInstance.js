import axios from 'axios';

const instance = axios.create({
  baseURL:
    window.location.host === 'https://oauthuat2.utcook.com'
      ? 'https://oauthuat2.utcook.com'
      : 'https://oauthdev2.utcook.com',
  headers: {
    accept: '*/*',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
export default instance;

export const instanceForm = axios.create({
  baseURL:
    window.location.host === 'https://oauthuat2.utcook.com'
      ? 'https://oauthuat2.utcook.com'
      : 'https://oauthdev2.utcook.com',
  headers: {
    accept: '*/*',
    'content-type': 'application/x-www-form-urlencoded',
  },
});
