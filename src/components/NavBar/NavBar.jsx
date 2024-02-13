import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import css from './NavBar.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const NavBar = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li className={css.listItem}>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
