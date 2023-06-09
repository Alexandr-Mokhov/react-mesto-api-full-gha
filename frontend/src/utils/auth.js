import checkResponse from './checkResponse';

function request(url, option) { // для локальной разработки использовать http://localhost:3000
  return fetch(`https://api.mokhov.nomoredomains.rocks${url}`, option).then(checkResponse);
}

export const registerUser = ({ email, password }) => {
  return request('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export const authorizeUser = ({ email, password }) => {
  return request('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export const checkToken = () => {
  const token = localStorage.getItem('token');
  return request('/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}
