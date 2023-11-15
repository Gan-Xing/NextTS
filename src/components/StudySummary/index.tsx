import { StudySummaryProps } from '@/types';

const StudySummary: React.FC<StudySummaryProps> = ({ slug }) => {
	return (
		<div>
			<h2>学习总结</h2>
			<p>当前主题: {slug}</p>
		</div>
	);
};
export default StudySummary;
