<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Button from './Button.svelte';

	let {
		currentPage = $bindable(1),
		totalPages,
		onPageChange
	}: {
		currentPage?: number;
		totalPages: number;
		onPageChange?: (page: number) => void;
	} = $props();

	function goToPage(page: number) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
		onPageChange?.(page);
	}

	const pages = $derived(() => {
		const result: (number | 'ellipsis')[] = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) result.push(i);
		} else {
			result.push(1);
			if (currentPage > 3) result.push('ellipsis');
			for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
				result.push(i);
			}
			if (currentPage < totalPages - 2) result.push('ellipsis');
			result.push(totalPages);
		}
		return result;
	});
</script>

<div class="flex items-center justify-center gap-2 mt-6">
	<Button variant="ghost" size="sm" disabled={currentPage === 1} onclick={() => goToPage(currentPage - 1)}>
		<ChevronLeft size={16} />
	</Button>

	{#each pages() as page}
		{#if page === 'ellipsis'}
			<span class="px-2 text-text-light">...</span>
		{:else}
			<button
				class="btn btn-sm rounded-lg min-w-[36px] {currentPage === page
					? 'bg-primary text-text-inverse'
					: 'bg-background-pure hover:bg-background-toned-2 border border-gray/50'}"
				onclick={() => goToPage(page)}
			>
				{page}
			</button>
		{/if}
	{/each}

	<Button variant="ghost" size="sm" disabled={currentPage === totalPages} onclick={() => goToPage(currentPage + 1)}>
		<ChevronRight size={16} />
	</Button>
</div>
