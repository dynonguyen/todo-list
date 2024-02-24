import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { axiosInstance } from '~/configs/query-client';
import { ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/key';
import { Category } from '~/types/Category';
import CategoryIconSelect from './CategoryIconSelect';

type CategoryForm = Pick<Category, 'name' | 'color' | 'icon'>;

const MAX = { NAME: 100 };
const DEFAULT = {
  COLOR: '#464748'
};

const schema = yup.object({
  name: yup.string().trim().required().max(MAX.NAME),
  icon: yup.string().trim().required(),
  color: yup.string().trim().required()
});

const addCategory = (category: CategoryForm) => {
  const now = new Date();
  return axiosInstance.post(ENDPOINT.POST_NEW_CATEGORY, {
    ...category,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now
  });
};

export const NewCategoryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm<CategoryForm>({ resolver: yupResolver(schema), defaultValues: { color: DEFAULT.COLOR } });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      onSuccess();
      toast.success('Success');
      reset({ name: '', color: DEFAULT.COLOR, icon: '' });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES] });
    }
  });

  const handleAddCategory = (category: CategoryForm) => {
    mutation.mutate(category);
  };

  return (
    <form className="flex flex-col gap-3 py-4" onSubmit={handleSubmit(handleAddCategory)}>
      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className={clsx('label-text', { 'text-error': Boolean(errors.name) })}>Category name:</span>
        </div>
        <input
          type="text"
          placeholder="Enter the name"
          className={clsx('w-full max-w-xs input-sm input input-bordered', { 'input-error': Boolean(errors.name) })}
          maxLength={MAX.NAME}
          {...register('name')}
        />
        {errors.name && (
          <div className="label">
            <span className="label-text-alt text-error">{errors.name.message}</span>
          </div>
        )}
      </label>

      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className={clsx('label-text', { 'text-error': Boolean(errors.icon) })}>Category icon:</span>
        </div>
        <CategoryIconSelect
          onSelect={(icon) => {
            setValue('icon', icon, { shouldValidate: true });
          }}
          value={getValues('icon')}
        />
      </label>

      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className={clsx('label-text', { 'text-error': Boolean(errors.color) })}>Category color:</span>
        </div>
        <input type="color" {...register('color')} />
      </label>

      <button type="submit" className="btn btn-primary btn-md">
        Submit
      </button>
    </form>
  );
};

export default NewCategoryForm;
