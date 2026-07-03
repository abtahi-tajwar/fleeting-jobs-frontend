<script lang="ts">
	let { rows = 3, class: className = '' }: { rows?: number; class?: string } = $props();
</script>

<div class="animate-pulse space-y-3 {className}">
	{#each Array(rows) as _, i (i)}
		<div class="h-12 rounded-lg bg-background-toned-2 dark:bg-background-toned-2-dark"></div>
	{/each}
</div>
