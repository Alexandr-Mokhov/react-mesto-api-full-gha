import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../utils/formValidator';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, handleChange, errors, isValid, setIsValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    values['input-name'] = currentUser.name;
    values['input-profession'] = currentUser.about;
    setIsValid(true);
    errors['input-name'] = '';
    errors['input-profession'] = '';
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: values['input-name'],
      about: values['input-profession'],
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!isValid}
    >
      <input
        id="name-input"
        className={`popup__input ${!errors['input-name'] || 'popup__input_type_error'}`}
        name="input-name"
        type="text"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        value={values['input-name'] || ''}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${!errors['input-name'] || 'popup__input-error_active'}`}>
        {errors['input-name']}
      </span>
      <input
        id="profession-input"
        className={`popup__input ${!errors['input-profession'] || 'popup__input_type_error'}`}
        name="input-profession"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={values['input-profession'] || ''}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${!errors['input-profession'] || 'popup__input-error_active'}`}>
        {errors['input-profession']}
      </span>
    </PopupWithForm>
  )
}