<script lang="ts">
	import type { Company } from '$lib/types/company';
	import StatusBadge from '$lib/components/common/StatusBadge.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { Pencil, Trash2, Power, PowerOff, ExternalLink } from 'lucide-svelte';

	let {
		companies,
		onEdit,
		onDelete,
		onToggleEnabled
	}: {
		companies: Company[];
		onEdit: (company: Company) => void;
		onDelete: (company: Company) => void;
		onToggleEnabled: (company: Company) => void;
	} = $props();
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-gray/50 text-left text-text-light dark:text-text-light-dark">
				<th class="pb-3 pr-4 font-medium">Company</th>
				<th class="pb-3 pr-4 font-medium">Listing URL</th>
				<th class="pb-3 pr-4 font-medium">URL Template</th>
				<th class="pb-3 pr-4 font-medium">Status</th>
				<th class="pb-3 font-medium">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each companies as company (company.id)}
				<tr class="border-b border-gray/30 hover:bg-background-toned-1/50 transition-colors">
					<td class="py-3 pr-4">
						<div class="flex items-center gap-2">
							<span
								class="h-2 w-2 rounded-full {company.enabled ? 'bg-green-500' : 'bg-gray-400'}"
								title={company.enabled ? 'Enabled' : 'Disabled'}
							></span>
							<span class="font-medium">{company.name}</span>
						</div>
					</td>
					<td class="py-3 pr-4">
						<a
							href={company.listingUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1 text-primary hover:underline max-w-[240px] truncate"
						>
							{company.listingUrl}
							<ExternalLink size={12} />
						</a>
					</td>
					<td class="py-3 pr-4 font-mono text-xs text-text-light max-w-[200px] truncate">
						{company.singlePageUrlTemplate || '—'}
					</td>
					<td class="py-3 pr-4">
						<StatusBadge status={company.enabled ? 'active' : 'inactive'} />
					</td>
					<td class="py-3">
						<div class="flex flex-wrap gap-1">
							<Button variant="ghost" size="sm" title="Edit" onclick={() => onEdit(company)}>
								<Pencil size={14} />
							</Button>
							<Button variant="ghost" size="sm" title="Delete" onclick={() => onDelete(company)}>
								<Trash2 size={14} />
							</Button>
							{#if company.enabled}
								<Button variant="ghost" size="sm" title="Disable" onclick={() => onToggleEnabled(company)}>
									<PowerOff size={14} />
								</Button>
							{:else}
								<Button variant="ghost" size="sm" title="Enable" onclick={() => onToggleEnabled(company)}>
									<Power size={14} />
								</Button>
							{/if}
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="5" class="py-8 text-center text-text-light">No companies configured yet.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
