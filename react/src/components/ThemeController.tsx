import React from 'react';
import { LS_KEY } from '~/constants/key';

export const ThemeController = () => {
  React.useLayoutEffect(() => {
    const mode = localStorage.getItem(LS_KEY.THEME) || 'dark';
    document.documentElement.setAttribute('data-theme', mode);
  }, []);

  const toggleTheme = () => {
    const mode = localStorage.getItem(LS_KEY.THEME) === 'dark' ? 'light' : 'dark';
    localStorage.setItem(LS_KEY.THEME, mode);
    document.documentElement.setAttribute('data-theme', mode);
  };

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" onChange={toggleTheme} />
      <span className="icon-[ph--sun-fill] w-6 h-6 text-base-content swap-on"></span>
      <span className="icon-[ph--moon-fill] w-6 h-6 text-base-content swap-off"></span>
    </label>
  );
};

export default ThemeController;
