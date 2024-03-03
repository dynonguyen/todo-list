'use client';

import clsx from 'clsx';
import React from 'react';
import useSWR from 'swr';
import { ENDPOINT } from '~/constants/endpoint';
import { Category } from '~/types/Category';
import { swrFetcher } from '~/utils/swr';

interface CategorySelectProps {
  value?: string;
  onSelect?: (id: string) => void;
}

export const CategorySelect = (props: CategorySelectProps) => {
  const { value, onSelect } = props;

  const [open, setOpen] = React.useState(false);
  const { data: categories = [] } = useSWR<Category[]>(ENDPOINT.GET_CATEGORIES, { fetcher: swrFetcher });

  return (
    <React.Fragment>
      {value ? (
        <div
          className="flex items-center justify-center transition-colors rounded-md cursor-pointer w-11 h-11 bg-base-300/70 hover:bg-base-300"
          onClick={(ev) => {
            ev.preventDefault();
            setOpen(true);
          }}
        >
          <img className="w-5 h-5 mx-auto" src={categories.find((cat) => cat.id === value)?.icon} />
        </div>
      ) : (
        <button type="button" className="btn btn-sm" onClick={() => setOpen(true)}>
          <span className="icon-[ph--tag-fill]"></span>
          Choose category
        </button>
      )}

      <dialog className={clsx('modal', { 'modal-open': open })}>
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Choose category</h3>
            <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          {categories.length ? (
            <div className="grid grid-cols-4 gap-4 py-4">
              {categories.map((category) => (
                <div key={category.id} className="tooltip tooltip-top" data-tip={category.name}>
                  <div
                    className="flex items-center justify-center w-10 h-10 transition-shadow rounded-md cursor-pointer hover:shadow-lg"
                    style={{ backgroundColor: category.color }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setOpen(false);
                      onSelect?.(category.id);
                    }}
                  >
                    <img className="w-5 h-5" src={category.icon} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-center text-gray-500">No category found</p>
          )}
        </div>
      </dialog>
    </React.Fragment>
  );
};

export default CategorySelect;
