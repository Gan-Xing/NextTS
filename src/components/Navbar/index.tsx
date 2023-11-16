import styles from '@/styles/Navbar.module.css';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { FaBars, FaSearch, FaShoppingBag, FaTimes } from 'react-icons/fa';
import { NavItemProps, NavItems } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

const navItems: NavItems[] = [
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

const NavItem: FunctionComponent<NavItemProps> = ({ component, url, resetVisible }) => {
	return (
		<Link
			onMouseEnter={resetVisible}
			className={`${styles.navItem} ${styles.navLink}`}
			href={url}>
			{component}
		</Link>
	);
};

const Navbar = () => {
	const [isNavListVisible, setIsNavListVisible] = useState(false);
	const [isBagVisible, setIsBagVisible] = useState(false);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [animateIcon, setAnimateIcon] = useState(false);
	const [isWildScreen, setIsWildScreen] = useState(false);
	const isFirstRender = useRef(true);

	const toggleNavList = () => {
		if (isNavListVisible || isBagVisible || isSearchVisible) {
			setIsNavListVisible(false);
			setIsBagVisible(false);
			setIsSearchVisible(false);
		} else {
			setIsNavListVisible(true);
		}
	};

	const toggleShopping = () => {
		setIsBagVisible(!isBagVisible);
	};

	const toggleSearch = () => {
		setIsSearchVisible(!isSearchVisible);
	};

	const resetVisible = () => {
		isSearchVisible && setIsSearchVisible(false);
		isBagVisible && setIsBagVisible(false);
	};

	const getNavbarClassName = (
		isNavListVisible: boolean,
		isBagVisible: boolean,
		isSearchVisible: boolean,
		isWildScreen: boolean
	) => {
		// 定义默认的类名
		let className = styles.navbar;

		// 根据条件添加额外的类名
		if (isNavListVisible || ((isBagVisible || isSearchVisible) && !isWildScreen)) {
			className += ` ${styles.navbarExpanded}`;
		}
		if ((isBagVisible || isSearchVisible) && isWildScreen) {
			className += ` ${styles.navbarSemiExpanded}`;
		}
		return className;
	};

	useEffect(() => {
		if (isFirstRender.current) {
			// 如果是首次渲染，什么也不做
			isFirstRender.current = false;
		} else {
			// 非首次渲染时，激活动画
			setAnimateIcon(true);

			// 设置定时器，并在动画结束后重置动画状态
			const timer = setTimeout(() => {
				setAnimateIcon(false);
			}, 300); // 动画持续时间

			// 清理函数：清除定时器
			return () => clearTimeout(timer);
		}
	}, [isNavListVisible, isBagVisible, isSearchVisible]);

	useEffect(() => {
		const checkMediaQuery = () => {
			// 使用 matchMedia 检查屏幕宽度
			const mediaQuery = window.matchMedia('(min-width: 48rem)');
			if (mediaQuery.matches) {
				// 如果屏幕宽度大于 48rem，则设置 isNavListVisible 为 false
				setIsNavListVisible(false);
				setIsBagVisible(false);
				setIsSearchVisible(false);
				setIsWildScreen(true);
			} else {
				setIsWildScreen(false);
			}
		};

		// 添加监听器
		window.addEventListener('resize', checkMediaQuery);

		// 在组件挂载时立即检查一次
		checkMediaQuery();

		// 清理函数
		return () => {
			window.removeEventListener('resize', checkMediaQuery);
		};
	}, []);

	return (
		<nav
			className={
				(isBagVisible || isSearchVisible) && isWildScreen
					? styles.navbarFrosted
					: ''
			}>
			<div
				onMouseLeave={() => {
					if (isWildScreen) {
						isBagVisible && setIsBagVisible(false);
						isSearchVisible &&
							setIsSearchVisible(false);
					}
				}}
				className={getNavbarClassName(
					isNavListVisible,
					isBagVisible,
					isSearchVisible,
					isWildScreen
				)}>
				<div
					className={
						isNavListVisible ||
						isBagVisible ||
						isSearchVisible
							? `${styles.navbarContainer} ${styles.containerExpanded}`
							: styles.navbarContainer
					}>
					{isNavListVisible ||
					(!isWildScreen && isBagVisible) ||
					(!isWildScreen && isSearchVisible) ? (
						''
					) : (
						<NavLogo />
					)}
					{navItems.map((link) => (
						<NavItem
							key={link.url}
							component={link.component}
							url={link.url}
							resetVisible={resetVisible}
						/>
					))}
					<div
						className={`${styles.navItem} ${styles.navButtons}`}>
						{isNavListVisible ||
						(!isWildScreen && isBagVisible) ||
						(!isWildScreen && isSearchVisible) ? (
							''
						) : (
							<div
								className={`${styles.navItem} ${styles.navButton}`}
								onClick={
									toggleSearch
								}
								onMouseEnter={() => {
									isBagVisible &&
										setIsBagVisible(
											false
										);
								}}>
								<FaSearch />
							</div>
						)}
						{isNavListVisible ||
						(!isWildScreen && isBagVisible) ||
						(!isWildScreen && isSearchVisible) ? (
							''
						) : (
							<div
								className={`${styles.navItem} ${styles.navButton}`}
								onClick={
									toggleShopping
								}
								onMouseEnter={() => {
									isSearchVisible &&
										setIsSearchVisible(
											false
										);
								}}>
								<FaShoppingBag />
							</div>
						)}
						<div
							className={`${styles.navItem} ${styles.navButton} ${styles.hamburger}`}
							onClick={toggleNavList}>
							{isNavListVisible ||
							isBagVisible ||
							isSearchVisible ? (
								<FaTimes
									className={
										animateIcon
											? styles.iconTimes
											: ''
									}
								/>
							) : (
								<FaBars
									className={
										animateIcon
											? styles.iconBars
											: ''
									}
								/>
							)}
						</div>
					</div>
				</div>
				{isNavListVisible ? (
					<div className={styles.navMenu}>
						{navItems.map((link) => (
							<Link
								className={`${styles.navMenuItem}`}
								key={link.url}
								href={link.url}>
								{link.component}
							</Link>
						))}
					</div>
				) : (
					''
				)}
				{isBagVisible ? (
					<div
						className={
							isWildScreen
								? styles.bagContentExpanded
								: styles.bagContent
						}>
						<div className={styles.bagItems}>
							<h2>Your Bag is Empty</h2>
							<span
								className={
									styles.bagNotes
								}>
								Shop Now
							</span>
						</div>
						<div className={styles.myProfile}>
							<h3
								className={
									styles.profileTitle
								}>
								My Profile
							</h3>
							<ul
								className={
									styles.profileLinks
								}>
								<Link
									className={
										styles.profileLink
									}
									href='/'>
									Orders
								</Link>
								<Link
									className={
										styles.profileLink
									}
									href='/'>
									Your Saves
								</Link>
								<Link
									className={
										styles.profileLink
									}
									href='/signup'>
									Sign Up
								</Link>
								<Link
									className={
										styles.profileLink
									}
									href='/'>
									Sign In
								</Link>
							</ul>
						</div>
					</div>
				) : (
					''
				)}
				{isSearchVisible ? (
					<div
						style={{
							fontSize: '1.5rem',
							color: 'white',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						下拉搜索界面待开发
					</div>
				) : (
					''
				)}
			</div>
		</nav>
	);
};

export default Navbar;
