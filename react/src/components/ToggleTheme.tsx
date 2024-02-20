export const ToggleTheme = () => {
  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" value="dark" />
      <span className="icon-[ph--sun-fill] w-6 h-6 text-base-content swap-on"></span>
      <span className="icon-[ph--moon-fill] w-6 h-6 text-base-content swap-off"></span>
    </label>
  );
};

export default ToggleTheme;
