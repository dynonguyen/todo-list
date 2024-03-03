'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { addCategory } from '~/server-actions/category';
import { Category } from '~/types/Category';
import CategoryIconSelect from './CategoryIconSelect';

export type CategoryForm = Pick<Category, 'name' | 'color' | 'icon'>;

const MAX = { NAME: 100 };
const DEFAULT = { COLOR: '#464748' };

const schema = yup.object({
  name: yup.string().trim().required().max(MAX.NAME),
  icon: yup.string().trim().required(),
  color: yup.string().trim().required()
});

export const NewCategoryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm<CategoryForm>({ resolver: yupResolver(schema), defaultValues: { color: DEFAULT.COLOR } });
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddCategory = async (category: CategoryForm) => {
    if (isAdding) return;

    setIsAdding(true);

    const [error] = await addCategory(category);

    if (error) {
      toast.error(error.message);
    } else {
      onSuccess();
      toast.success('Success');
      reset({ name: '', color: DEFAULT.COLOR, icon: '' });
    }

    setIsAdding(false);
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
          onSelect={(icon) => setValue('icon', icon, { shouldValidate: true })}
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
        {isAdding && <span className="loading loading-spinner"></span>}
        Submit
      </button>
    </form>
  );
};

export default NewCategoryForm;
