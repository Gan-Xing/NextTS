import { LayoutProps } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/Layout.module.css';
import Head from 'next/head';

const Layout: React.FC<LayoutProps> = ({
	children,
	containerClassName,
	contentClassName,
	sectionClassName
}) => {
	return (
		<>
			<Head>
				<title>My Website</title>
				<meta name='description' content='Welcome to my website' />
				<link rel='icon' href='/logoBig.svg' />
			</Head>
			<div className={`${styles.container} ${containerClassName}`}>
				<Navbar />
				<main className={`${styles.content} ${contentClassName}`}>
					<section
						className={`${styles.section} ${sectionClassName}`}>
						{children}
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
