<script lang="ts">
	import type { Parser } from '$lib/types';
	import StatusBadge from '$lib/components/common/StatusBadge.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { Pencil, Trash2, Power, PowerOff } from 'lucide-svelte';

	let { parsers }: { parsers: Parser[] } = $props();

	const statusDotColors: Record<string, string> = {
		active: 'bg-green-500',
		inactive: 'bg-gray-400',
		error: 'bg-red-500',
		pending: 'bg-amber-500 animate-pulse'
	};
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-gray/50 text-left text-text-light dark:text-text-light-dark">
				<th class="pb-3 pr-4 font-medium">Company</th>
				<th class="pb-3 pr-4 font-medium">Parser Name</th>
				<th class="pb-3 pr-4 font-medium">Status</th>
				<th class="pb-3 pr-4 font-medium">Last Updated</th>
				<th class="pb-3 pr-4 font-medium">Jobs Found</th>
				<th class="pb-3 font-medium">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each parsers as parser (parser.id)}
				<tr class="border-b border-gray/30 hover:bg-background-toned-1/50 transition-colors">
					<td class="py-3 pr-4">
						<div class="flex items-center gap-2">
							<span
								class="h-2 w-2 rounded-full {statusDotColors[parser.status]}"
								title={parser.status}
							></span>
							<span class="font-medium">{parser.company}</span>
						</div>
					</td>
					<td class="py-3 pr-4 font-mono text-xs text-text-light">{parser.parserName}</td>
					<td class="py-3 pr-4">
						<StatusBadge status={parser.status} />
					</td>
					<td class="py-3 pr-4 text-text-light">{parser.lastUpdated}</td>
					<td class="py-3 pr-4 font-medium">{parser.jobsFound}</td>
					<td class="py-3">
						<div class="flex flex-wrap gap-1">
							<Button variant="ghost" size="sm" title="Edit">
								<Pencil size={14} />
							</Button>
							<Button variant="ghost" size="sm" title="Delete">
								<Trash2 size={14} />
							</Button>
							{#if parser.status === 'active'}
								<Button variant="ghost" size="sm" title="Disable">
									<PowerOff size={14} />
								</Button>
							{:else}
								<Button variant="ghost" size="sm" title="Enable">
									<Power size={14} />
								</Button>
							{/if}
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
