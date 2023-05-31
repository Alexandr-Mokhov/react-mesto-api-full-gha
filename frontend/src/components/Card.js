import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(itemLike => itemLike._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__heart ${isLiked && 'elements__heart_type_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="elements__item">
      <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <div className="elements__delete" onClick={handleDeleteClick} />}
      <div className="elements__mask">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__like-info">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="elements__amount-heart">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

