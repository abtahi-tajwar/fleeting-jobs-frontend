<script lang="ts">
	import type { Component } from 'svelte';

	let {
		title = 'No data found',
		description = 'There is nothing to display here yet.',
		icon: Icon
	}: {
		title?: string;
		description?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: Component<any>;
	} = $props();
</script>

<div class="flex flex-col items-center justify-center py-16 text-center">
	{#if Icon}
		<div class="mb-4 rounded-full bg-background-toned-2 p-4">
			<Icon size={32} class="text-text-light" />
		</div>
	{/if}
	<h3 class="text-lg font-semibold text-text dark:text-text-dark font-secondary">{title}</h3>
	<p class="mt-2 text-sm text-text-light dark:text-text-light-dark max-w-sm">{description}</p>
</div>
