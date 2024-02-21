import { Link } from 'react-router-dom';
import logoSrc from '~/assets/logo.png';
import { PATH } from '~/constants/path';
import ThemeController from '../ThemeController';

export const TopBar = () => {
  return (
    <div className="flex justify-between p-4">
      <Link to={PATH.TODO}>
        <div className="flex items-center justify-center gap-3">
          <img className="flex justify-center w-10" src={logoSrc} />
          <h1 className="text-2xl font-medium text-primary">Dodo</h1>
        </div>
      </Link>

      <ThemeController />
    </div>
  );
};

export default TopBar;
