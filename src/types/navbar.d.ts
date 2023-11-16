export interface NavItems {
	component: ReactNode;
	url: string;
}
export interface NavItemProps extends NavItems {
	resetVisible: () => void;
}
