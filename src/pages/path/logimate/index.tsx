import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import styles from '@/styles/Path.module.css';
import { LogimateProps } from '@/types';

// 导入你的组件
import StudyContent from '@/components/StudyContent';
import StudyPlan from '@/components/StudyPlan';
import StudyProgress from '@/components/StudyProgress';
import StudySummary from '@/components/StudySummary';
import { useState } from 'react';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 从环境变量中获取GitHub token

async function fetchGitHubCommits(repoUrl: string) {
	const response = await fetch(`https://api.github.com/repos/${repoUrl}/commits`, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`
		}
	});
	return response.json();
}

const Logimate: React.FC<LogimateProps> = ({ slug, commits }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(0); // 默认为null，没有激活的组件

	const components = [
		{ component: <StudyContent key='StudyContent' />, label: '学习内容' },
		{ component: <StudyPlan key='StudyPlan' />, label: '学习计划' },
		{
			component: <StudyProgress key='StudyProgress' commits={commits} />,
			label: '学习进度'
		},
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = 'logimate';

	// 获取两个仓库的commits
	const commits1 = await fetchGitHubCommits('Gan-Xing/Antdpro6');
	const commits2 = await fetchGitHubCommits('Gan-Xing/NestJSAntdpro6');

	// 将两个commits数组合并（您可以根据需要修改此处的逻辑）
	const combinedCommits = [...commits1, ...commits2];

	// 按日期对提交记录进行排序，确保最新的提交位于最上面
	combinedCommits.sort((a, b) => {
		const dateA = new Date(a.commit.author.date);
		const dateB = new Date(b.commit.author.date);
		return dateB.getTime() - dateA.getTime();
	});

	return {
		props: {
			slug,
			commits: combinedCommits
		}
	};
};

export default Logimate;
