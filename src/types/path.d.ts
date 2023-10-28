import { SlugProps } from './common';

export interface MilestoneData {
	id: number;
	label: string;
	slug: string;
}
export interface MilestoneProps {
	label: string;
	slug: string;
	showArrow: boolean;
}

export interface LogimateProps extends SlugProps {
	commits: any[];
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

export interface StudyProgressProps {
	commits?: CommitProps[];
}
