export default function ImagePopup({ name, isOpen, onClose, cardName, cardLink }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container popup__container_type_image">
        <button className="popup__close" type="button" onClick={onClose} />
        <img className="popup__image" src={cardLink} alt={cardName} />
        <h3 className="popup__title popup__title_type_image">{cardName}</h3>
      </div>
    </div>
  )
}

