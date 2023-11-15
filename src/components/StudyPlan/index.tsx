import { StudyPlanProps } from "@/types";

const StudyPlan: React.FC<StudyPlanProps> = ({ slug }) => {
	return (
		<div>
			<h2>学习计划</h2>
			<p>当前主题: {slug}</p>
		</div>
	);
};
export default StudyPlan;
