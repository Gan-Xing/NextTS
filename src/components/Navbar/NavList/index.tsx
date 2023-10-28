import NavLink from './NavLink';
import styles from '@/styles/Navbar.module.css';
import { NavListProps } from '@/types';
import { FunctionComponent } from 'react';

const NavList: FunctionComponent<NavListProps> = ({ navLinks, isVisible }) => {
	return (
		<div
			className={`${styles.navList} ${
				isVisible ? styles.showNavList : styles.hideNavList
			}`}>
			{navLinks.map((link) => (
				<NavLink
					key={link.url}
					component={link.component}
					url={link.url}
				/>
			))}
		</div>
	);
};

export default NavList;
