<script lang="ts">
	import '../global.css';
	import '../tailwind.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (typeof window !== 'undefined') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (prefersDark) {
				document.documentElement.classList.add('dark');
			}
		}
	});
</script>

<div class="min-h-screen bg-background dark:bg-background-dark font-primary text-text dark:text-text-dark">
	{@render children()}
</div>
