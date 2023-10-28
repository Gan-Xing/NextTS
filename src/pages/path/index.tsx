import Layout from '@/components/Layout';
import styles from '@/styles/Path.module.css';
import { MilestoneData, MilestoneProps } from '@/types';
import Link from 'next/link';

const milestones: MilestoneData[] = [
	{ id: 1, label: 'HTML+CSS', slug: 'html-css' },
	{ id: 2, label: 'JavaScript', slug: 'javascript' },
	{ id: 3, label: 'Ajax', slug: 'ajax' },
	{ id: 4, label: 'ES6', slug: 'es6' },
	{ id: 5, label: 'HomeBrew', slug: 'homebrew' },
	{ id: 6, label: 'NPM', slug: 'npm' },
	{ id: 7, label: 'Gulp', slug: 'gulp' },
	{ id: 8, label: 'Git', slug: 'git' },
	{ id: 9, label: 'React', slug: 'react' },
	{ id: 10, label: '物流项目', slug: 'logimate' }
];

const Milestone: React.FC<MilestoneProps> = ({ label, slug, showArrow }) => {
	return (
		<div className={styles.milestone}>
			<Link href={`path/${slug}`}>
				<span className={styles.card}>{label}</span>
			</Link>
			{showArrow && <div className={styles.arrow} />}
		</div>
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
						showArrow={
							index < milestones.length - 1
						}
					/>
				))}
			</div>
		</Layout>
	);
};

export default Path;
