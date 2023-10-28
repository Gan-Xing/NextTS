import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';

function Custom404() {
	return (
		<Layout>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<div className={styles.ball}></div>
				<h1 className={styles.text}>404-页面开发中。。。</h1>
			</div>
		</Layout>
	);
}

export default Custom404;
