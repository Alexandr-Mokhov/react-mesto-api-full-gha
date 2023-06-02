import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main({
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  onCardLike,
  cards,
  onCardDelete
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-hover" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
          </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__profession">{currentUser.about}</p>
            </div>
            <button className="profile__edit" type="button" onClick={onEditProfile} />
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {cards.map((itemCard, i) => {
            return (
              <Card
                key={itemCard._id}
                card={itemCard}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          }).reverse()
          }
        </ul>
      </section>
    </main>
  );
}

