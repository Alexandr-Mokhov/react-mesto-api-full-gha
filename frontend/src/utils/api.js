import checkResponse from './checkResponse';

function request(url, option) {
  return fetch(`https://api.mokhov.nomoredomains.rocks${url}`, option).then(checkResponse);
}

function setHeaders() {
  const token = localStorage.getItem('token');
  return { 
    'Authorization': `Bearer ${token}`, 
    'Content-Type': 'application/json' 
  };
}

export function getInitialCards() {
  return request('/cards', { headers: setHeaders() })
};

export function getUserInfo() {
  return request('/users/me', { headers: setHeaders() })
}

export function setUserInfo(userNameData, dataUserAbout) {
  return request('/users/me', {
    method: 'PATCH',
    headers: setHeaders(),
    body: JSON.stringify({
      name: userNameData,
      about: dataUserAbout
    })
  });
}

export function setUserAvatar(dataAvatar) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: setHeaders(),
    body: JSON.stringify({
      avatar: dataAvatar
    })
  });
}

export function addNewCard(nameCard, linkCard) {
  return request('/cards', {
    method: 'POST',
    headers: setHeaders(),
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  });
}

export function deleteUserCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: setHeaders(),
  });
}

export function changeLikeCardStatus(cardId, noLike) {
  return request(`/cards/${cardId}/likes`, {
    method: `${noLike ? 'PUT' : 'DELETE'}`,
    headers:  setHeaders(),
  });
}
