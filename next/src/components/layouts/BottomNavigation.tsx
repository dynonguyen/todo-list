'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import NewTodo from '~/app/todo/(new-todo)';
import { PATH } from '~/constants/path';
import Link from '../Link';

type MenuItem = {
	title: string;
	to: string;
	icon: string;
	activeIcon: string;
};

export const BottomNavigation = () => {
	const pathname = usePathname();

	const leftMenu: MenuItem[] = [
		{
			title: 'Todo',
			to: PATH.TODO,
			icon: 'icon-[ph--check-circle]',
			activeIcon: 'icon-[ph--check-circle-fill]',
		},
		{
			title: 'Category',
			to: PATH.CATEGORY,
			icon: 'icon-[ph--shapes]',
			activeIcon: 'icon-[ph--shapes-fill]',
		},
	];

	const rightMenu: MenuItem[] = [
		{
			title: 'Calendar',
			to: PATH.CALENDAR,
			icon: 'icon-[ph--calendar]',
			activeIcon: 'icon-[ph--calendar-fill]',
		},
		{
			title: 'Focus',
			to: PATH.FOCUS,
			icon: 'icon-[ph--timer]',
			activeIcon: 'icon-[ph--timer-fill]',
		},
	];

	const renderMenuItem = React.useCallback(
		(item: MenuItem) => {
			const selected = pathname === item.to;

			return (
				<Link
					key={item.to}
					href={item.to}
					className={`flex flex-col items-center justify-center gap-2 transition-all ${selected ? 'text-base-content' : 'text-base-content/75'} hover:text-base-content`}
				>
					<span
						className={`${selected ? item.activeIcon : item.icon} w-6 h-6`}
					></span>
					<li className='text-xs'>{item.title}</li>
				</Link>
			);
		},
		[pathname],
	);

	return (
		<ul className='flex items-center justify-between gap-2 py-2 bg-base-200 px-7'>
			{leftMenu.map(renderMenuItem)}

			<NewTodo />

			{rightMenu.map(renderMenuItem)}
		</ul>
	);
};

export default BottomNavigation;
