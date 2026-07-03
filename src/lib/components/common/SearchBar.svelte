<script lang="ts">
	import { Search } from 'lucide-svelte';

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		class: className = ''
	}: {
		value?: string;
		placeholder?: string;
		class?: string;
	} = $props();
</script>

<div class="relative {className}">
	<Search
		size={18}
		class="absolute left-3 top-1/2 -translate-y-1/2 text-text-light dark:text-text-light-dark"
	/>
	<input
		type="search"
		bind:value
		{placeholder}
		class="w-full rounded-lg border border-gray/60 bg-background-pure/60 dark:bg-background-pure-dark/60 py-2.5 pl-10 pr-4 text-sm text-text dark:text-text-dark placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
	/>
</div>
