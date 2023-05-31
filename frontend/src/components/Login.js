import { useNavigate } from 'react-router';
import FormPage from './FormPage';
import { useFormWithValidation } from '../utils/formValidator';
import { authorizeUser } from '../utils/auth';

export default function Login({
  isLoading,
  setIsLoading,
  setLoggedIn,
  setIsInfoTooltipPopupOpen,
  setEmailLogin,
  setNotificationText
}) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);

    authorizeUser({
      email: values['email'],
      password: values['password']
    })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate('/', { replace: true });
          setEmailLogin(values['email']);
          resetForm();
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setLoggedIn(false);
        setNotificationText('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err + ` : Ошибка введенных данных`);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <FormPage
      name="form"
      title="Вход"
      buttonText={isLoading ? 'Вход...' : 'Войти'}
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
        autoComplete="off"
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
        autoComplete="off"
      />
      <span className={`popup__input-error ${!errors['password'] || 'popup__input-error_active'}`}>
        {errors['password']}
      </span>
    </FormPage>
  )
}

