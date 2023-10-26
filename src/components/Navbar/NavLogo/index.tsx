import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

const NavLogo = () => {
	return (
		<div className={styles.navLogo}>
			<Link href='/' passHref>
				<Image src='/logo.svg' alt='Logo' width={120} height={40} />
			</Link>
		</div>
	);
};

export default NavLogo;
