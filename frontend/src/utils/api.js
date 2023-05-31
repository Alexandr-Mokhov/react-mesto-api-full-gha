import checkResponse from './checkResponse';

const headers = {
  authorization: 'e80cbcbe-f719-4921-a30f-8e0ec3c72a1d', // Токен
  'Content-Type': 'application/json'
}

function request(url, option) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-60${url}`, option).then(checkResponse);
}

export function getInitialCards() {
  return request('/cards', { headers: headers });
}

export function getUserInfo() {
  return request('/users/me', { headers: headers });
}

export function setUserInfo(userNameData, dataUserAbout) {
  return request('/users/me', {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: userNameData,
      about: dataUserAbout
    })
  });
}

export function setUserAvatar(dataAvatar) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      avatar: dataAvatar
    })
  });
}

export function addNewCard(nameCard, linkCard) {
  return request('/cards', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  });
}

export function deleteUserCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: headers,
  });
}

export function changeLikeCardStatus(cardId, noLike) {
  return request(`/cards/${cardId}/likes`, {
    method: `${noLike ? 'PUT' : 'DELETE'}`,
    headers: headers
  });
}
