export default function InfoTooltip({ isOpen, onClose, notificationText }) {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container popup__container_type_info">
        <button className="popup__close" type="button" onClick={onClose} />
        <div className={`${notificationText === 'Вы успешно зарегистрировались!' ? 'popup__image_type_ok' : 'popup__image_type_err'}`} />
        <h3 className="popup__title popup__title_type_info">
          {notificationText}
        </h3>
      </div>
    </div>
  )
}

