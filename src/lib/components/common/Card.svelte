<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		subtitle,
		padding = 'p-5',
		class: className = '',
		children
	}: {
		title?: string;
		subtitle?: string;
		padding?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div
	class="rounded-xl bg-background-pure dark:bg-background-pure-dark shadow-sm border border-gray/50 {padding} {className}"
>
	{#if title}
		<div class="mb-4">
			<h3 class="text-base font-semibold text-text dark:text-text-dark font-secondary">{title}</h3>
			{#if subtitle}
				<p class="text-sm text-text-light dark:text-text-light-dark mt-1">{subtitle}</p>
			{/if}
		</div>
	{/if}
	{@render children()}
</div>
