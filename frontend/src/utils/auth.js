import checkResponse from './checkResponse';

function request(url, option) {
  return fetch(`https://auth.nomoreparties.co${url}`, option).then(checkResponse);
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

export const checkToken = (jwt) => {
  return request('/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  });
}
