import logoSrc from '../assets/logo.png';

export const AppLogo = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <img className="flex justify-center w-10" src={logoSrc} />
      <h1 className="text-2xl font-medium text-primary">Dodo</h1>
    </div>
  );
};

export default AppLogo;
