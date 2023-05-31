import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../utils/formValidator'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: values['avatar-link'],
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!isValid}
    >
      <input
        id="link-avatar-input"
        className={`popup__input ${!errors['avatar-link'] || 'popup__input_type_error'}`}
        name="avatar-link"
        type="url"
        placeholder="Ссылка на аватар"
        required
        value={values['avatar-link'] || ''}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${!errors['avatar-link'] || 'popup__input-error_active'}`}>
        {errors['avatar-link']}
      </span>
    </PopupWithForm>
  )
}