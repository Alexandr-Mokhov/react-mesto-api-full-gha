import checkResponse from './checkResponse';

function request(url, option) {
  return fetch(`http://localhost:3000${url}`, option).then(checkResponse);
}

export function getInitialCards() {
  const token = localStorage.getItem('token');
  return request('/cards', { 
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
};

export function getUserInfo() {
  const token = localStorage.getItem('token');
  return request('/users/me', { 
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
}

export function setUserInfo(userNameData, dataUserAbout) {
  const token = localStorage.getItem('token');
  return request('/users/me', {
    method: 'PATCH',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userNameData,
      about: dataUserAbout
    })
  });
}

export function setUserAvatar(dataAvatar) {
  const token = localStorage.getItem('token');
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: dataAvatar
    })
  });
}

export function addNewCard(nameCard, linkCard) {
  const token = localStorage.getItem('token');
  return request('/cards', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  });
}

export function deleteUserCard(cardId) {
  const token = localStorage.getItem('token');
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
}

export function changeLikeCardStatus(cardId, noLike) {
  const token = localStorage.getItem('token');
  return request(`/cards/${cardId}/likes`, {
    method: `${noLike ? 'PUT' : 'DELETE'}`,
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
}
