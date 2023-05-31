import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup({ isOpen, onClose, isLoading, onCardDelete }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}