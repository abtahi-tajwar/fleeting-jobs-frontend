<script lang="ts">
	import { Menu, Bell, User, Sun, Moon } from 'lucide-svelte';
	import SearchBar from './SearchBar.svelte';
	import { layoutStore } from '$lib/stores/layout.svelte';

	let searchQuery = $state('');
</script>

<header class="relative border-b border-gray/60 p-4">
	<div class="mesh-background pointer-events-none absolute inset-0"></div>
	<div class="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
		<div class="flex items-center gap-3">
			<button
				class="btn btn-circle btn-ghost btn-sm border-none lg:hidden"
				onclick={() => layoutStore.toggleMobileMenu()}
				aria-label="Open menu"
			>
				<Menu size={20} />
			</button>
			<div class="flex flex-col">
				<span class="text-sm font-light text-text-light dark:text-text-light-dark">Welcome back</span>
				<span class="font-medium text-text dark:text-text-dark font-secondary">Job Seeker</span>
			</div>
		</div>

		<div class="flex-1 max-w-xl">
			<SearchBar bind:value={searchQuery} placeholder="Quick search..." />
		</div>

		<div class="flex items-center gap-2">
			<label class="swap swap-rotate cursor-pointer">
				<input
					type="checkbox"
					checked={layoutStore.darkMode}
					onchange={() => layoutStore.toggleTheme()}
				/>
				<Sun size={22} class="swap-on text-amber-500" />
				<Moon size={22} class="swap-off text-text-light" />
			</label>
			<button class="btn btn-circle btn-ghost btn-sm bg-background-pure border-none" aria-label="Notifications">
				<Bell size={18} />
			</button>
			<button class="btn btn-circle btn-ghost btn-sm bg-background-pure border-none" aria-label="Profile">
				<User size={18} />
			</button>
		</div>
	</div>
</header>

<style>
	.mesh-background {
		opacity: 0.3;
		background: radial-gradient(
			circle 250px at 70% -150px,
			var(--color-primary-light-3) 0%,
			transparent 100%
		);
		filter: blur(60px);
	}
</style>
