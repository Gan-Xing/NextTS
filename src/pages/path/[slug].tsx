import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import styles from '@/styles/Path.module.css';
import { CommitProps, pathSlugProps } from '@/types';

import { useState } from 'react';

// 导入你的组件
import StudyContent from '@/components/StudyContent';
import StudyPlan from '@/components/StudyPlan';
import StudyProgress from '@/components/StudyProgress';
import StudySummary from '@/components/StudySummary';
import { fetchGitHubCommits } from '@/services';

const SlugPage: React.FC<pathSlugProps> = ({ slug, commits }) => {
	const [slugcommits, setSlugCommits] = useState([]);
	const [activeTab, setActiveTab] = useState<
		'StudyContent' | 'StudyPlan' | 'StudyProgress' | 'StudySummary'
	>('StudyContent');

	const components: Record<
		'StudyContent' | 'StudyPlan' | 'StudyProgress' | 'StudySummary',
		JSX.Element
	> = {
		StudyContent: <StudyContent slug={slug} />,
		StudyPlan: <StudyPlan slug={slug} />,
		StudyProgress: <StudyProgress slug={slug} commits={commits} />,
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

export const getServerSideProps: GetServerSideProps<pathSlugProps> = async (context) => {
	const { slug } = context.query;
	const commitsUrls = context.query.commitsUrls as string;

	let combinedCommits: CommitProps[] = [];
	if (commitsUrls) {
		// 分割 commitsUrls 字符串为单独的 URL
		const urls = commitsUrls.split(',');

		for (const url of urls) {
			const repoCommits = await fetchGitHubCommits(url.trim());
			combinedCommits = [...combinedCommits, ...repoCommits];
		}

		// 按日期排序...
		combinedCommits.sort((a, b) => {
			const dateA = new Date(a.commit.author.date);
			const dateB = new Date(b.commit.author.date);
			return dateB.getTime() - dateA.getTime();
		});
	}

	return {
		props: {
			slug,
			commits: combinedCommits
		}
	};
};

export default SlugPage;
