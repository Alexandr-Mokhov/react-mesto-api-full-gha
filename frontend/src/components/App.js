import { useEffect, useState } from 'react';
import { react } from '@babel/types';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {
  getUserInfo, changeLikeCardStatus, deleteUserCard,
  setUserInfo, setUserAvatar, getInitialCards, addNewCard
} from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';
import Login from './Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { checkToken } from '../utils/auth';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, cardData: {} });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '', cohort: '' });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [emailLogin, setEmailLogin] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const isOpen = isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard.isOpen ||
    isDeleteCardPopupOpen ||
    isInfoTooltipPopupOpen;

  function handleErrorMessage(message) {
    closeAllPopups();
    setIsInfoTooltipPopupOpen(true);
    setNotificationText(message);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setEmailLogin(res.data.email);

          if (res.data) {
            setLoggedIn(true);
            navigate('/', { replace: true });
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => {
          console.log(err + ` : Ошибка с токеном`);
          handleErrorMessage('Сбой! Авторизация пользователя не произошла.');
        });
    }
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
        evt.target.blur();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return
    }
    function handleClickOverlay(evt) {
      if (evt.target.className.indexOf('popup_opened') > 1) {
        closeAllPopups();
      }
    };
    document.addEventListener('mousedown', handleClickOverlay);
    return () => {
      document.removeEventListener('mousedown', handleClickOverlay);
    };
  }, [closeAllPopups]);

  useEffect(() => {
    getUserInfo()
      .then(userData => setCurrentUser(userData))
      .catch((err) => {
        console.log(err + ` : Ошибка получения данных пользователя`);
        handleErrorMessage('Сбой! Не получены данные пользователя.');
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, cardData: card });
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setSelectedCard({ isOpen: false, cardData: card });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setIsLoading(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(itemLike => itemLike._id === currentUser._id);

    changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((arrayItem) => arrayItem._id === card._id ? newCard : arrayItem));
      })
      .catch((err) => {
        console.log(err + ` : Ошибка с лайками`);
        handleErrorMessage('Сбой! Запрос на лайк не сработал.');
      });
  }

  function handleCardDelete() {
    setIsLoading(true);
    deleteUserCard(selectedCard.cardData._id)
      .then(() => {
        setCards((state) => state.filter(arrayItem => arrayItem._id !== selectedCard.cardData._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err + ` : Ошибка удаления карточки`);
        handleErrorMessage('Сбой! Запрос на удаление не сработал.');
      });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    setUserInfo(userData.name, userData.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err + ` : Ошибка изменения профиля`);
        handleErrorMessage('Ошибка! Введены некорректные данные или сбой сервера.')
      });
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    setUserAvatar(userData.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err + ` : Ошибка изменения аватара`);
        handleErrorMessage('Ошибка! Введены некорректные данные или сбой сервера.');
      });
  }

  useEffect(() => {
    getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err + ` : Ошибка загрузки карточек`);
        handleErrorMessage('Сбой! Карточки не загружены.');
      });
  }, []);

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    addNewCard(cardData.namePlace, cardData.linkPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err + ` : Ошибка загрузки новой карточки`);
        handleErrorMessage('Ошибка! Введены некорректные данные или сбой сервера.')
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          emailLogin={emailLogin}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
          <Route path="/sign-up" element={
            <Register
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
              setNotificationText={setNotificationText}
            />
          } />
          <Route path="/sign-in" element={
            <Login
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setLoggedIn={setLoggedIn}
              setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
              setEmailLogin={setEmailLogin}
              setNotificationText={setNotificationText}
            />
          } />
          <Route path="/" element={
            <ProtectedRouteElement element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleDeleteCardClick}
            />}
          />
          <Route path="*" element={
            <div className="page_type_not-found">
              <h2>Page Not Found</h2>
              <p>Такой страницы нет</p>
            </div>
          } />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup
          name="image"
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
          cardName={selectedCard.cardData.name}
          cardLink={selectedCard.cardData.link}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          notificationText={notificationText}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

