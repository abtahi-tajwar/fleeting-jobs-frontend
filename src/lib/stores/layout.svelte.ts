export type SidenavState = 'expanded' | 'collapsed' | 'hidden';

class LayoutStore {
	sidenavState = $state<SidenavState>('expanded');
	mobileMenuOpen = $state(false);
	darkMode = $state(false);

	toggleSidenav() {
		this.sidenavState = this.sidenavState === 'expanded' ? 'collapsed' : 'expanded';
	}

	collapseSidenav() {
		this.sidenavState = 'collapsed';
	}

	expandSidenav() {
		this.sidenavState = 'expanded';
	}

	toggleMobileMenu() {
		this.mobileMenuOpen = !this.mobileMenuOpen;
	}

	closeMobileMenu() {
		this.mobileMenuOpen = false;
	}

	toggleTheme() {
		this.darkMode = !this.darkMode;
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', this.darkMode);
		}
	}
}

export const layoutStore = new LayoutStore();
