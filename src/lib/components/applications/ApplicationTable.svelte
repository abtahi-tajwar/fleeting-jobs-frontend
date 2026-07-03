<script lang="ts">
	import type { Application } from '$lib/types';
	import StatusBadge from '$lib/components/common/StatusBadge.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { applicationStatuses } from '$lib/data/applications';
	import { Eye, Pencil } from 'lucide-svelte';

	let {
		applications,
		statusFilter = $bindable(''),
		companyFilter = $bindable('')
	}: {
		applications: Application[];
		statusFilter?: string;
		companyFilter?: string;
	} = $props();

	const filtered = $derived(
		applications.filter((app) => {
			const matchesStatus = !statusFilter || app.status === statusFilter;
			const matchesCompany =
				!companyFilter || app.company.toLowerCase().includes(companyFilter.toLowerCase());
			return matchesStatus && matchesCompany;
		})
	);

	function formatDate(date: string) {
		if (!date) return '—';
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
	<input
		type="text"
		bind:value={companyFilter}
		placeholder="Filter by company..."
		class="input input-sm w-full sm:max-w-xs rounded-lg border-gray/60"
	/>
	<select
		bind:value={statusFilter}
		class="select select-sm w-full sm:max-w-xs rounded-lg border-gray/60"
	>
		<option value="">All statuses</option>
		{#each applicationStatuses as status}
			<option value={status}>{status}</option>
		{/each}
	</select>
</div>

<div class="overflow-x-auto">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-gray/50 text-left text-text-light dark:text-text-light-dark">
				<th class="pb-3 pr-4 font-medium">Company</th>
				<th class="pb-3 pr-4 font-medium">Position</th>
				<th class="pb-3 pr-4 font-medium">Applied Date</th>
				<th class="pb-3 pr-4 font-medium">Status</th>
				<th class="pb-3 pr-4 font-medium">Interview Date</th>
				<th class="pb-3 pr-4 font-medium">Notes</th>
				<th class="pb-3 font-medium">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as app (app.id)}
				<tr class="border-b border-gray/30 hover:bg-background-toned-1/50 transition-colors">
					<td class="py-3 pr-4 font-medium">{app.company}</td>
					<td class="py-3 pr-4 text-text-light">{app.position}</td>
					<td class="py-3 pr-4 text-text-light">{formatDate(app.appliedDate)}</td>
					<td class="py-3 pr-4">
						<StatusBadge status={app.status} />
					</td>
					<td class="py-3 pr-4 text-text-light">{formatDate(app.interviewDate ?? '')}</td>
					<td class="py-3 pr-4 text-text-light max-w-[200px] truncate">{app.notes || '—'}</td>
					<td class="py-3">
						<div class="flex gap-1">
							<Button variant="ghost" size="sm">
								<Eye size={14} />
							</Button>
							<Button variant="ghost" size="sm">
								<Pencil size={14} />
							</Button>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="7" class="py-8 text-center text-text-light">No applications match your filters.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
