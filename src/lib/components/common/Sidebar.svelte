<script lang="ts">
	import {
		LayoutDashboard,
		Search,
		FileText,
		Briefcase,
		Building2,
		Bot,
		Settings,
		ChevronLeft,
		ChevronRight,
		X
	} from 'lucide-svelte';
	import { page } from '$app/stores';
	import { navItems } from '$lib/data/navigation';
	import { layoutStore } from '$lib/stores/layout.svelte';

	const iconMap = {
		'layout-dashboard': LayoutDashboard,
		search: Search,
		'file-text': FileText,
		briefcase: Briefcase,
		building: Building2,
		bot: Bot,
		settings: Settings
	};

	let sidenavState = $derived(layoutStore.sidenavState);
	let mobileMenuOpen = $derived(layoutStore.mobileMenuOpen);

	const navWidth = $derived(
		sidenavState === 'expanded' ? 280 : sidenavState === 'collapsed' ? 70 : 0
	);
</script>

<!-- Mobile overlay -->
{#if mobileMenuOpen}
	<div
		class="fixed inset-0 z-40 bg-black/40 lg:hidden"
		onclick={() => layoutStore.closeMobileMenu()}
		role="presentation"
	></div>
{/if}

<aside
	class="relative flex h-full flex-col overflow-hidden border-r border-gray/60 bg-background-toned-1 dark:bg-background-toned-1-dark font-secondary font-medium transition-all duration-300 ease-in-out
		fixed lg:static z-50 lg:z-auto
		{mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}"
	style="width: {navWidth}px; min-width: {navWidth}px;"
>
	<div class="mesh-background pointer-events-none absolute -inset-10"></div>

	<!-- Logo -->
	<div class="relative flex items-center gap-3 p-4">
		<div
			class="flex items-center justify-center rounded-lg bg-primary text-text-inverse font-bold
				{sidenavState === 'collapsed' ? 'h-8 w-8 text-xs' : 'h-9 w-9 text-sm'}"
		>
			FJ
		</div>
		{#if sidenavState !== 'collapsed'}
			<p class="font-semibold text-text dark:text-text-dark">Fleeting Jobs</p>
			<button
				class="btn btn-circle btn-ghost btn-sm ml-auto border-none lg:flex hidden"
				onclick={() => layoutStore.collapseSidenav()}
				aria-label="Collapse sidebar"
			>
				<ChevronLeft size={16} />
			</button>
			<button
				class="btn btn-circle btn-ghost btn-sm ml-auto border-none lg:hidden"
				onclick={() => layoutStore.closeMobileMenu()}
				aria-label="Close menu"
			>
				<X size={16} />
			</button>
		{/if}
	</div>

	<!-- Navigation -->
	<nav class="relative flex flex-1 flex-col gap-1 overflow-y-auto p-2">
		{#each navItems as item (item.id)}
			{@const Icon = iconMap[item.icon as keyof typeof iconMap]}
			{@const isActive = $page.url.pathname.startsWith(item.href)}
			<a
				href={item.href}
				class="flex items-center gap-3 rounded-lg p-2.5 transition-all duration-300 ease-in-out
					{isActive
					? 'bg-background-pure dark:bg-background-pure-dark shadow-sm text-primary'
					: 'hover:bg-background-pure/50 dark:hover:bg-background-pure-dark/50 text-text dark:text-text-dark'}"
				onclick={() => layoutStore.closeMobileMenu()}
			>
				<Icon size={sidenavState === 'collapsed' ? 20 : 18} />
				{#if sidenavState !== 'collapsed'}
					<span class="text-sm">{item.label}</span>
				{/if}
			</a>
		{/each}
	</nav>

	{#if sidenavState === 'collapsed'}
		<button
			class="absolute top-5 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-text-inverse shadow-md lg:flex hidden"
			onclick={() => layoutStore.expandSidenav()}
			aria-label="Expand sidebar"
		>
			<ChevronRight size={14} />
		</button>
	{/if}
</aside>

<style>
	.mesh-background {
		opacity: 0.15;
		background:
			radial-gradient(circle 450px at 30% 60%, var(--color-primary) 0%, transparent 100%),
			radial-gradient(circle 250px at 40% 80%, var(--color-accent) 0%, transparent 100%);
		background-blend-mode: screen;
		animation: moveBlobs 10s ease-in-out infinite alternate;
		filter: blur(60px);
	}

	@keyframes moveBlobs {
		0% {
			background-position: 20% 20%, 80% 30%;
		}
		100% {
			background-position: 30% 10%, 70% 40%;
		}
	}
</style>
