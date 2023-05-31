export default function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isDisabledButton,
  children }) {
  return (

    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_popup">
        <button className="popup__close" type="button" onClick={onClose} />
        <form className="popup__form" onSubmit={onSubmit} name={name} noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            className={`popup__save popup__save_type_${isLoading || isDisabledButton ? 'inactive' : 'active'}`}
            type="submit" disabled={isLoading || isDisabledButton}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

