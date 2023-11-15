import styles from '@/styles/Navbar.module.css';
import { FunctionComponent, useState } from 'react';
import { FaBars, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { NavItemProps } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

const navItems: NavItemProps[] = [
	{
		component: 'Home',
		url: '/'
	},
	{
		component: 'Path',
		url: '/path'
	},
	{
		component: 'Interview',
		url: '/interview'
	},
	{
		component: 'Projects',
		url: '/projects'
	},
	{
		component: 'Insights',
		url: '/insights'
	},
	{
		component: 'Resources',
		url: '/resources'
	},
	{
		component: 'About',
		url: '/about'
	}
];

const NavLogo = () => {
	return (
		<Link className={`${styles.navItem} ${styles.navButton}`} href='/' passHref>
			<Image src='/logo.svg' alt='Logo' width={32} height={32} />
		</Link>
	);
};

const NavItem: FunctionComponent<NavItemProps> = ({ component, url }) => {
	return (
		<Link className={`${styles.navItem} ${styles.navLink}`} href={url}>
			{component}
		</Link>
	);
};

const Navbar = () => {
	const [isNavListVisible, setIsNavListVisible] = useState(true);

	const toggleNavList = () => {
		setIsNavListVisible(!isNavListVisible);
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbarContainer}>
				<NavLogo />
				{navItems.map((link) => (
					<NavItem
						key={link.url}
						component={link.component}
						url={link.url}
					/>
				))}
				<div className={`${styles.navItem} ${styles.navButtons}`}>
					<div
						className={`${styles.navItem} ${styles.navButton}`}>
						<FaSearch />
					</div>
					<div
						className={`${styles.navItem} ${styles.navButton}`}>
						<FaShoppingBag />
					</div>
					<div
						className={`${styles.navItem} ${styles.navButton} ${styles.hamburger}`}
						onClick={toggleNavList}>
						<FaBars />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
