import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../utils/formValidator';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      namePlace: values['card-name'],
      linkPlace: values['card-link'],
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen])

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={isLoading ? 'Добавление...' : 'Добавить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!isValid}
    >
      <input
        id="card-name-input"
        className={`popup__input ${!errors['card-name'] || 'popup__input_type_error'}`}
        name="card-name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values['card-name'] || ''}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${!errors['card-name'] || 'popup__input-error_active'}`}>
        {errors['card-name']}
      </span>
      <input
        id="link-input"
        className={`popup__input ${!errors['card-link'] || 'popup__input_type_error'}`}
        name="card-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={values['card-link'] || ''}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${!errors['card-link'] || 'popup__input-error_active'}`}>
        {errors['card-link']}
      </span>
    </PopupWithForm>
  )
} 