import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import styles from '@/styles/Path.module.css';
import { SlugProps } from '@/types';

import { useState } from 'react';

// 导入你的组件
import StudyContent from '@/components/StudyContent';
import StudyPlan from '@/components/StudyPlan';
import StudyProgress from '@/components/StudyProgress';
import StudySummary from '@/components/StudySummary';

const SlugPage: React.FC<SlugProps> = ({ slug }) => {
	const [activeIndex, setActiveIndex] = useState<number>(0); // 默认激活“学习内容”

	const components = [
		{ component: <StudyContent key='StudyContent' />, label: '学习内容' },
		{ component: <StudyPlan key='StudyPlan' />, label: '学习计划' },
		{ component: <StudyProgress key='StudyProgress' />, label: '学习进度' },
		{ component: <StudySummary key='StudySummary' />, label: '学习总结' }
	];

	return (
		<Layout
			contentClassName={styles.pathChildContent}
			sectionClassName={styles.pathChildSection}>
			{components.map(({ component, label }, index) => (
				<div
					key={index}
					className={`${styles.pathChildCards} ${
						index === activeIndex
							? styles.active
							: ''
					}`}
					onClick={() => setActiveIndex(index)}>
					{index === activeIndex ? (
						component
					) : (
						<span>{label}</span>
					)}
				</div>
			))}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<SlugProps> = async ({ params }) => {
	const slug = params?.slug as string;

	return {
		props: {
			slug
		}
	};
};

export default SlugPage;
