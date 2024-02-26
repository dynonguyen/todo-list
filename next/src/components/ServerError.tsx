import { withAssets } from '~/utils/helper';

export const ServerError = () => {
  return (
    <div className="mx-auto my-4 max-w-80">
      <img src={withAssets('bug-fixing.svg')} />
    </div>
  );
};

export default ServerError;
