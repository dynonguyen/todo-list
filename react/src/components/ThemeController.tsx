import { useThemeMode } from '~/stores/theme';

export const ThemeController = () => {
  const toggleTheme = useThemeMode((state) => state.toggleTheme);
  const mode = useThemeMode((state) => state.mode);

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" onChange={toggleTheme} />
      {mode === 'dark' ? (
        <span className="icon-[ph--sun-fill] w-6 h-6 text-base-content"></span>
      ) : (
        <span className="icon-[ph--moon-fill] w-6 h-6 text-base-content"></span>
      )}
    </label>
  );
};

export default ThemeController;
