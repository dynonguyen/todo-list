'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

type NextLinkProps = React.ComponentProps<typeof NextLink>;

export const Link = (props: NextLinkProps) => {
	const { href, onClick, children, ...others } = props;
	const router = useRouter();

	const handleNavigate: NextLinkProps['onClick'] = ev => {
		ev.preventDefault();
		router.push(href.toString());
	};

	return (
		<NextLink href={href} onClick={handleNavigate} {...others}>
			{children}
		</NextLink>
	);
};

export default Link;
