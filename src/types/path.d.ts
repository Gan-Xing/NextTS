import { SlugProps } from './common';

export interface MilestoneData {
	id: number;
	label: string;
	slug: string;
	commits: string[];
}
export interface MilestoneProps {
	label: string;
	slug: string;
	commitsUrls: string[];
}

export interface LogimateProps extends SlugProps {
	commits: CommitProps[];
}

export interface pathSlugProps extends SlugProps {
	commits: CommitProps[];
}

export interface CommitProps {
	sha: string;
	commit: {
		message: string;
		author: {
			name: string;
			date: string;
		};
	};
	html_url: string; // 链接到GitHub上的具体commit
}

export interface StudyProgressProps extends SlugProps {
	commits?: CommitProps[];
}

export interface StudyContentProps extends SlugProps {}

export interface StudyPlanProps extends SlugProps {}

export interface StudySummaryProps extends SlugProps {}
