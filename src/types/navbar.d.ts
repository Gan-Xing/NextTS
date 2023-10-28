export interface NavLinkProps {
	component: ReactNode;
	url: string;
}
export interface NavListProps {
	navLinks: NavLinkProps[];
	isVisible: boolean;
}
