<script lang="ts">
	import Sidebar from '$lib/components/common/Sidebar.svelte';
	import Header from '$lib/components/common/Header.svelte';
	import { layoutStore } from '$lib/stores/layout.svelte';

	let { children } = $props();

	const containerOffset = 12;
	let sidenavState = $derived(layoutStore.sidenavState);
	let navWidth = $derived(
		sidenavState === 'expanded' ? 280 : sidenavState === 'collapsed' ? 70 : 0
	);
</script>

<div
	class="bg-gradient-to-r from-primary dark:from-primary-dark to-accent dark:to-accent-dark h-screen w-full"
	style="padding: {containerOffset}px"
>
	<div
		class="flex h-full overflow-hidden rounded-xl bg-gradient-to-b from-background-toned-1 dark:from-background-toned-1-dark to-background-toned-0 dark:to-background-toned-0-dark transition-all duration-300 ease-in-out"
	>
		<div
			class="relative h-full shrink-0 transition-all duration-300 ease-in-out max-lg:hidden"
			style="width: {navWidth}px"
		>
			<Sidebar />
		</div>

		<div class="lg:hidden">
			<Sidebar />
		</div>

		<div class="flex h-full min-w-0 flex-1 flex-col">
			<Header />
			<main class="flex-1 overflow-y-auto p-4 md:p-6">
				{@render children()}
			</main>
		</div>
	</div>
</div>
