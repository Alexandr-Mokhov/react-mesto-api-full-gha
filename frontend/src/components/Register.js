import { useNavigate } from 'react-router';
import FormPage from './FormPage';
import { useFormWithValidation } from '../utils/formValidator';
import { registerUser } from '../utils/auth';

export default function Register({
  isLoading,
  setIsLoading,
  setIsInfoTooltipPopupOpen,
  setNotificationText
}) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);

    registerUser({
      email: values['email'],
      password: values['password']
    })
      .then((res) => {
        if (res.data) {
          setNotificationText('Вы успешно зарегистрировались!');
          navigate('/sign-in', { replace: true });
          resetForm();
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        setNotificationText('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err + ` : Ошибка введенных данных`);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoTooltipPopupOpen(true)
      });
  }

  return (
    <FormPage
      name="form"
      title="Регистрация"
      buttonText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabledButton={!isValid}
    >
      <input
        id="input-email"
        className={`form__input ${!errors['email'] || 'form__input_type_error'}`}
        name="email"
        type="email"
        placeholder="E-mail"
        required
        value={values['email'] || ''}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${!errors['email'] || 'popup__input-error_active'}`}>
        {errors['email']}
      </span>
      <input
        id="input-password"
        className={`form__input ${!errors['password'] || 'form__input_type_error'}`}
        name="password"
        type="password"
        placeholder="Пароль"
        required
        minLength="4"
        value={values['password'] || ''}
        onChange={handleChange}
      />
      <span className={`popup__input-error ${!errors['password'] || 'popup__input-error_active'}`}>
        {errors['password']}
      </span>
    </FormPage>
  )
}

