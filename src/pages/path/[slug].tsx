import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import styles from '@/styles/Path.module.css';
import { GitHubCommit, SlugProps } from '@/types';
import { useEffect, useState } from 'react';

// 导入你的组件
import StudyContent from '@/components/StudyContent';
import StudyPlan from '@/components/StudyPlan';
import StudyProgress from '@/components/StudyProgress';
import StudySummary from '@/components/StudySummary';

const SlugPage: React.FC<SlugProps> = ({ slug }) => {
	const [activeTab, setActiveTab] = useState<
		'StudyContent' | 'StudyPlan' | 'StudyProgress' | 'StudySummary'
	>('StudyContent');
	const [slugCommits, setSlugCommits] = useState<GitHubCommit[]>([]);
	useEffect(() => {
		const fetchCommits = async () => {
			const response = await fetch(`/api/commits/${slug}`);
			const data = await response.json();
			setSlugCommits(data.commits);
		};
		console.log('====1');

		if (slug) {
			console.log('====2');
			fetchCommits();
		}
	}, [slug]);
	console.log('====3');

	const components: Record<
		'StudyContent' | 'StudyPlan' | 'StudyProgress' | 'StudySummary',
		JSX.Element
	> = {
		StudyContent: <StudyContent slug={slug} />,
		StudyPlan: <StudyPlan slug={slug} />,
		StudyProgress: <StudyProgress slug={slug} commits={slugCommits} />,
		StudySummary: <StudySummary slug={slug} />
	};

	return (
		<Layout
			contentClassName={styles.pathChildContent}
			sectionClassName={styles.pathChildSection}>
			<div className={styles.pathChildContainer}>
				<div className={styles.tabsContainer}>
					{Object.keys(components).map((key) => (
						<button
							key={key}
							className={`${styles.tab} ${
								activeTab === key
									? styles.active
									: ''
							}`}
							onClick={() =>
								setActiveTab(
									key as
										| 'StudyContent'
										| 'StudyPlan'
										| 'StudyProgress'
										| 'StudySummary'
								)
							}>
							{key.replace('Study', '')}
						</button>
					))}
				</div>
				<div className={styles.tabContent}>
					{components[activeTab]}
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<SlugProps> = async (context) => {
	const slug = context.params?.slug;

	if (!slug || typeof slug !== 'string') {
		// 处理 slug 不存在的情况
		return {
			notFound: true
		};
	}

	return {
		props: {
			slug
		}
	};
};

export default SlugPage;
