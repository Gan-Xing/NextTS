import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { NavLinkProps } from '@/types';
import { FunctionComponent } from 'react';

const NavLink: FunctionComponent<NavLinkProps> = ({ component, url }) => {
	return (
		<Link className={styles.navLink} href={url}>
			{component}
		</Link>
	);
};

export default NavLink;
