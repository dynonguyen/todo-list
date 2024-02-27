'use client';

import React from 'react';
import { useThemeMode } from '~/stores/theme';

export const ThemeController = () => {
  const { toggleTheme, mode } = useThemeMode();
  const id = React.useId();

  React.useEffect(() => {
    const elem = document.getElementById(id)!;

    if (mode === 'dark') {
      elem.classList.remove('icon-[ph--sun-fill]');
      elem.classList.add('icon-[ph--moon-fill]');
    } else {
      elem.classList.remove('icon-[ph--moon-fill]');
      elem.classList.add('icon-[ph--sun-fill]');
    }
  }, [mode]);

  return (
    <span
      id={id}
      className="w-6 h-6 text-base-content cursor-pointer icon-[ph--moon-fill]"
      onClick={toggleTheme}
    ></span>
  );
};

export default ThemeController;
