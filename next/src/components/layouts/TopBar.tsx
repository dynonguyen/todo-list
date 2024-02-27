'use client';

import { PATH } from '~/constants/path';
import { withAssets } from '~/utils/helper';
import Link from '../Link';
import ThemeController from '../ThemeController';

export const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href={PATH.TODO}>
        <div className="flex items-center justify-center gap-3">
          <img className="flex justify-center w-10" src={withAssets('logo.png')} />
          <h1 className="text-2xl font-medium text-primary">Dodo</h1>
        </div>
      </Link>

      <ThemeController />
    </div>
  );
};

export default TopBar;
