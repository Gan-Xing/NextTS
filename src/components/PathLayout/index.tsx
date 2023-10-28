import styles from '@/styles/Path.module.css';
import { LayoutProps } from '@/types';

const PathLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={styles.pathContainer}>
			{/* 你的统一布局内容 */}
			{children} {/* 子路由的内容将在这里显示 */}
		</div>
	);
};

export default PathLayout;
