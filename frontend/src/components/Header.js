import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header({ emailLogin, loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
    setIsOpenedMenu(false);
  }

  function handleOpenedMenu() {
    if (isOpenedMenu) {
      setIsOpenedMenu(false);
    } else {
      setIsOpenedMenu(true);
    }
  }

  return (
    <header className="header">
      <div className={`header__menu${isOpenedMenu && loggedIn ? '_opened' : ''}`}>
        <h2 className="header__menu-email">{loggedIn ? emailLogin : ''}</h2>
        <Link to="/sign-in" onClick={onSignOut} className="header__link header__link_type_mobile-out">Выйти</Link>
      </div>
      <div className="header__container">
        <div className="header__logo" />
        <h2 className={`header__email ${loggedIn ? '' : 'header__email_active'}`}>
          {loggedIn ? emailLogin : ''}
        </h2>
        <div className="header__links">
          {pathname === '/' && <Link to="/sign-in" onClick={onSignOut} className="header__link header__link_type_desctop-out">Выйти</Link>}
          {pathname === '/sign-in' && <Link to="/sign-up" className="header__link">Регистрация</Link>}
          {pathname === '/sign-up' && <Link to="/sign-in" className="header__link">Войти</Link>}
        </div>
        {loggedIn && <button className={`header__menu-button header__menu-button${isOpenedMenu ? '_close' : '_open'}`} onClick={handleOpenedMenu} />}
      </div>
    </header>
  );
}

