import styles from '@/styles/StudyProgress.module.css';
import { useState } from 'react';
import { StudyProgressProps } from '@/types';

const StudyProgress: React.FC<StudyProgressProps> = ({ slug, commits }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredCommits = commits?.filter((commit) =>
		commit.commit.message.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className={styles.studyProgressContainer}>
			<h2 className={styles.title}>学习进度--{slug}</h2>
			<input
				type='text'
				placeholder='搜索提交记录...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className={styles.searchBox}
			/>
			{filteredCommits && filteredCommits.length > 0 ? (
				<ul className={styles.commitList}>
					{filteredCommits.map((commit) => (
						<li
							key={commit.sha}
							className={styles.commitBox}>
							<a
								href={
									commit.html_url
								}
								target='_blank'
								rel='noopener noreferrer'>
								{
									commit
										.commit
										.message
								}{' '}
								by{' '}
								{
									commit
										.commit
										.author
										.name
								}{' '}
								on{' '}
								{new Date(
									commit.commit.author.date
								).toLocaleDateString()}
							</a>
						</li>
					))}
				</ul>
			) : (
				<p>没有匹配的提交记录。</p>
			)}
		</div>
	);
};

export default StudyProgress;
