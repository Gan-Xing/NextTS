// pages/api/commits/[slug].ts
import { fetchGitHubCommits } from '@/services';
import { GitHubCommit, ResponseCommit } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseCommit>) {
	const { slug } = req.query;
	let commitsUrls: string[] = [];

	switch (slug) {
		case 'logimate':
			commitsUrls = ['Gan-Xing/Antdpro6', 'Gan-Xing/NestJSAntdpro6'];
			break;
		// 其他情况
		default:
			// 默认情况或错误处理
			res.status(404).json({ commits: [] });
			return;
	}

	let combinedCommits: GitHubCommit[] = [];
	for (const url of commitsUrls) {
		const repoCommits: GitHubCommit[] = await fetchGitHubCommits(url.trim());
		combinedCommits = [...combinedCommits, ...repoCommits];
	}

	// 按日期排序...
	combinedCommits.sort((a, b) => {
		const dateA = new Date(a.commit.author.date);
		const dateB = new Date(b.commit.author.date);
		return dateB.getTime() - dateA.getTime();
	});

	res.status(200).json({ commits: combinedCommits });
}
