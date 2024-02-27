import { withAssets } from '~/utils/helper';

interface PageResultProps {
  imgSrc: string;
  title?: string;
}

export const PageResult = (props: PageResultProps) => {
  const { imgSrc, title } = props;

  return (
    <div className="mx-auto my-4 max-w-72">
      <img src={withAssets(imgSrc)} />
      {title && <h1 className="mt-4 text-lg text-center text-base-content/75">{title}</h1>}
    </div>
  );
};

export default PageResult;
