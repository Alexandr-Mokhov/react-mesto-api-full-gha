import { Link } from 'react-router-dom';

export default function FormPage({ name, title, buttonText, onSubmit, isLoading, isDisabledButton, children }) {

  return (
    <div className={`popup popup_type_${name}`}>
      <div className={`popup__container popup__container_type_form`}>
        <form className="popup__form" onSubmit={onSubmit} name={name} noValidate>
          <h3 className="popup__title popup__title_type_form">{title}</h3>
          {children}
          <button
            className={`popup__save popup__save_type_form popup__save_type_${isLoading || isDisabledButton ? 'inactive' : 'active'}`}
            type="submit" disabled={isLoading || isDisabledButton}
          >
            {buttonText}
          </button>
          {title === 'Регистрация' ? <Link className="form__link-login" to="/sign-in">Уже зарегистрированы? Войти</Link> : ''}
        </form>
      </div>
    </div>
  )
}

