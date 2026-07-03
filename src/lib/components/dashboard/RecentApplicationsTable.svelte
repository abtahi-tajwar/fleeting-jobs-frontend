<script lang="ts">
	import type { Application } from '$lib/types';
	import StatusBadge from '$lib/components/common/StatusBadge.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { ExternalLink } from 'lucide-svelte';

	let { applications }: { applications: Application[] } = $props();

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-gray/50 text-left text-text-light dark:text-text-light-dark">
				<th class="pb-3 pr-4 font-medium">Company</th>
				<th class="pb-3 pr-4 font-medium">Position</th>
				<th class="pb-3 pr-4 font-medium">Status</th>
				<th class="pb-3 pr-4 font-medium">Applied Date</th>
				<th class="pb-3 font-medium">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each applications as app (app.id)}
				<tr class="border-b border-gray/30 hover:bg-background-toned-1/50 transition-colors">
					<td class="py-3 pr-4 font-medium text-text dark:text-text-dark">{app.company}</td>
					<td class="py-3 pr-4 text-text-light dark:text-text-light-dark">{app.position}</td>
					<td class="py-3 pr-4">
						<StatusBadge status={app.status} />
					</td>
					<td class="py-3 pr-4 text-text-light dark:text-text-light-dark">
						{formatDate(app.appliedDate)}
					</td>
					<td class="py-3">
						<Button variant="ghost" size="sm">
							<ExternalLink size={14} />
							View
						</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
