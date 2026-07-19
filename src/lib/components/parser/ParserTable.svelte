<script lang="ts">
	import type { ParserTemplate } from '$lib/types/parser';
	import Button from '$lib/components/common/Button.svelte';
	import { Pencil, Trash2 } from 'lucide-svelte';

	let {
		parsers,
		onEdit,
		onDelete
	}: {
		parsers: ParserTemplate[];
		onEdit: (parser: ParserTemplate) => void;
		onDelete: (parser: ParserTemplate) => void;
	} = $props();

	function configValue (parser: ParserTemplate, key: string): string {
		const value = parser.config?.[key];
		if (value == null || value === '') return '—';
		return String(value);
	}
</script>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-gray/50 text-left text-text-light dark:text-text-light-dark">
				<th class="pb-3 pr-4 font-medium">ID</th>
				<th class="pb-3 pr-4 font-medium">Company</th>
				<th class="pb-3 pr-4 font-medium">Start URL</th>
				<th class="pb-3 pr-4 font-medium">Version</th>
				<th class="pb-3 font-medium">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each parsers as parser (parser.id)}
				<tr class="border-b border-gray/30 hover:bg-background-toned-1/50 transition-colors">
					<td class="py-3 pr-4 font-mono text-xs text-text-light">#{parser.id}</td>
					<td class="py-3 pr-4">
						<span class="font-medium">{parser.companyName ?? 'Unassigned'}</span>
						{#if parser.companyId != null}
							<span class="ml-1 text-xs text-text-light">(#{parser.companyId})</span>
						{/if}
					</td>
					<td class="py-3 pr-4 font-mono text-xs text-text-light max-w-[280px] truncate">
						{configValue(parser, 'start_url')}
					</td>
					<td class="py-3 pr-4">{configValue(parser, 'version')}</td>
					<td class="py-3">
						<div class="flex flex-wrap gap-1">
							<Button variant="ghost" size="sm" title="Edit" onclick={() => onEdit(parser)}>
								<Pencil size={14} />
							</Button>
							<Button variant="ghost" size="sm" title="Delete" onclick={() => onDelete(parser)}>
								<Trash2 size={14} />
							</Button>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="5" class="py-8 text-center text-text-light">No parser templates configured yet.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
