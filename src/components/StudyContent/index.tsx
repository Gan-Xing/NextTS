import { StudyContentProps } from '@/types';

const StudyContent: React.FC<StudyContentProps> = ({ slug }) => {
	return (
		<div>
			<h2>学习内容</h2>
			<p>当前主题: {slug}</p>
		</div>
	);
};
export default StudyContent;
