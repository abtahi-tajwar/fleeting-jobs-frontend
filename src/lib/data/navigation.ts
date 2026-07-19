import type { NavItem } from '$lib/types';

export const navItems: NavItem[] = [
	{ id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard' },
	{ id: 'jobs', label: 'Job Search', href: '/jobs', icon: 'search' },
	{ id: 'resume', label: 'Resume Generator', href: '/resume', icon: 'file-text' },
	{ id: 'applications', label: 'Applications', href: '/applications', icon: 'briefcase' },
	{ id: 'companies', label: 'Companies', href: '/companies', icon: 'building' },
	{ id: 'parsers', label: 'Parsers', href: '/parsers', icon: 'bot' },
	{ id: 'settings', label: 'Settings', href: '/settings', icon: 'settings' }
];
