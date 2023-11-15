const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 从环境变量中获取GitHub token

export const fetchGitHubCommits = async (repoUrl: string) => {
	const response = await fetch(`https://api.github.com/repos/${repoUrl}/commits`, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`
		}
	});
	return response.json();
};
