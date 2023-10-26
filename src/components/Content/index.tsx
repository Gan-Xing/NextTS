import styles from '@/styles/Content.module.css';

const Content = () => {
	return (
		<main className={styles.content}>
			<h1>Welcome to my website</h1>
			<section className={styles.section}>
				<p>Here you can find useful information about...</p>
			</section>
		</main>
	);
};

export default Content;
