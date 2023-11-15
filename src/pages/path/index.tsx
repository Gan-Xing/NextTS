import Layout from '@/components/Layout';
import styles from '@/styles/Path.module.css';
import { MilestoneData, MilestoneProps } from '@/types';
import Link from 'next/link';

const milestones: MilestoneData[] = [
	{ id: 1, label: 'HTML+CSS', slug: 'html-css', commits: [] },
	{ id: 2, label: 'JavaScript', slug: 'javascript', commits: [] },
	{ id: 3, label: 'Ajax', slug: 'ajax', commits: [] },
	{ id: 4, label: 'ES6', slug: 'es6', commits: [] },
	{ id: 5, label: 'HomeBrew', slug: 'homebrew', commits: [] },
	{ id: 6, label: 'NPM', slug: 'npm', commits: [] },
	{ id: 7, label: 'Gulp', slug: 'gulp', commits: [] },
	{ id: 8, label: 'Git', slug: 'git', commits: [] },
	{
		id: 9,
		label: 'React',
		slug: 'react',
		commits: []
	},
	{
		id: 10,
		label: '物流项目',
		slug: 'logimate',
		commits: ['Gan-Xing/Antdpro6', 'Gan-Xing/NestJSAntdpro6']
	}
];

const Milestone: React.FC<MilestoneProps> = ({ label, slug, commitsUrls }) => {
	return (
		<Link
			className={styles.milestone}
			href={`/path/${slug}?commitsUrls=${commitsUrls.join(',')}`}>
			<div className={styles.milestoneInner}>
				<div className={styles.milestoneFront}>
					<h2 className={styles.label}>{label}</h2>
				</div>
				<div className={styles.milestoneBack}>
					<h2 className={styles.label}>More Info</h2>
					这是更多的内容
				</div>
			</div>
		</Link>
	);
};

const Path = () => {
	return (
		<Layout>
			<div className={styles.pathContainer}>
				{milestones.map((milestone, index) => (
					<Milestone
						key={milestone.id}
						label={milestone.label}
						slug={milestone.slug}
						commitsUrls={milestone.commits}
					/>
				))}
			</div>
		</Layout>
	);
};

export default Path;
