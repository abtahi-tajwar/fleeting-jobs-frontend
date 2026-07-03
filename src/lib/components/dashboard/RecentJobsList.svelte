<script lang="ts">
	import type { Job } from '$lib/types';
	import Button from '$lib/components/common/Button.svelte';
	import { MapPin } from 'lucide-svelte';

	let { jobs }: { jobs: Job[] } = $props();
</script>

<div class="space-y-3">
	{#each jobs as job (job.id)}
		<div
			class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray/40 p-4 hover:bg-background-toned-1/50 transition-colors"
		>
			<div class="flex-1">
				<p class="font-semibold text-text dark:text-text-dark">{job.company}</p>
				<p class="text-sm text-text-light dark:text-text-light-dark">{job.title}</p>
				<div class="mt-1 flex items-center gap-1 text-xs text-text-light">
					<MapPin size={12} />
					{job.location}
				</div>
			</div>
			<Button variant="primary" size="sm">Apply</Button>
		</div>
	{/each}
</div>
