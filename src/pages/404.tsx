import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';

function Custom404() {
	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.ball}></div>
				<h1 className={styles.text}>
					404-页面待开发 有想法随时联系
				</h1>
			</div>
		</Layout>
	);
}

export default Custom404;
