<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Card from '$lib/components/common/Card.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import LoadingSkeleton from '$lib/components/common/LoadingSkeleton.svelte';
	import ParserTable from '$lib/components/parser/ParserTable.svelte';
	import ParserFormModal from '$lib/components/parser/ParserFormModal.svelte';
	import DeleteParserModal from '$lib/components/parser/DeleteParserModal.svelte';
	import { listParserTemplates } from '$lib/api/parsers';
	import { getErrorMessage } from '$lib/api/client';
	import type { ParserTemplate } from '$lib/types/parser';
	import { Plus, RefreshCw, Search, X } from 'lucide-svelte';

	let { data } = $props();

	let filterResults = $state<ParserTemplate[] | null>(null);
	let formOpen = $state(false);
	let deleteOpen = $state(false);
	let selectedParser = $state<ParserTemplate | null>(null);
	let actionError = $state('');
	let refreshing = $state(false);

	let filterCompanyId = $state<number | null>(null);
	let filterCompanyName = $state('');

	const parsers = $derived(filterResults ?? data.parsers);

	async function refresh () {
		refreshing = true;
		actionError = '';
		filterResults = null;
		await invalidateAll();
		refreshing = false;
	}

	async function applyFilters () {
		refreshing = true;
		actionError = '';
		try {
			filterResults = await listParserTemplates({
				companyId: filterCompanyId,
				companyName: filterCompanyName
			});
		} catch (error) {
			actionError = getErrorMessage(error);
		} finally {
			refreshing = false;
		}
	}

	async function resetFilters () {
		filterCompanyId = null;
		filterCompanyName = '';
		await refresh();
	}

	function openCreate () {
		selectedParser = null;
		formOpen = true;
	}

	function openEdit (parser: ParserTemplate) {
		selectedParser = parser;
		formOpen = true;
	}

	function openDelete (parser: ParserTemplate) {
		selectedParser = parser;
		deleteOpen = true;
	}
</script>

<svelte:head>
	<title>Parsers | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Parser Templates</h1>
			<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
				Manage scraping configurations for each company
			</p>
		</div>
		<div class="flex gap-2">
			<Button variant="ghost" size="md" onclick={refresh} disabled={refreshing}>
				<RefreshCw size={16} class={refreshing ? 'animate-spin' : ''} />
				Refresh
			</Button>
			<Button variant="primary" size="md" onclick={openCreate}>
				<Plus size={16} />
				Add Parser
			</Button>
		</div>
	</div>

	{#if data.error}
		<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
			<p class="font-medium">Failed to load parser templates</p>
			<p class="mt-1">{data.error}</p>
			<p class="mt-2 text-xs">Make sure the backend is running at {import.meta.env.PUBLIC_API_BASE_URL ?? 'http://localhost:8080'}</p>
		</div>
	{/if}

	{#if actionError}
		<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
			{actionError}
		</div>
	{/if}

	<Card title="Filters" subtitle="Filter parser templates by company">
		<div class="flex flex-col gap-3 sm:flex-row sm:items-end">
			<div class="flex-1">
				<label for="filter-company-id" class="mb-1 block text-xs text-text-light">Company</label>
				<select
					id="filter-company-id"
					bind:value={filterCompanyId}
					class="select w-full rounded-lg border-gray/60"
				>
					<option value={null}>All companies</option>
					{#each data.companies as company (company.id)}
						<option value={company.id}>{company.name} (#{company.id})</option>
					{/each}
				</select>
			</div>
			<div class="flex-1">
				<label for="filter-company-name" class="mb-1 block text-xs text-text-light">Company name contains</label>
				<input
					id="filter-company-name"
					type="text"
					bind:value={filterCompanyName}
					placeholder="e.g. Stripe"
					class="input w-full rounded-lg border-gray/60"
				/>
			</div>
			<div class="flex gap-2">
				<Button variant="primary" size="md" onclick={applyFilters} disabled={refreshing}>
					<Search size={16} />
					Apply
				</Button>
				<Button variant="ghost" size="md" onclick={resetFilters} disabled={refreshing}>
					<X size={16} />
					Reset
				</Button>
			</div>
		</div>
	</Card>

	<Card title="Parser Templates" subtitle="{parsers.length} templates">
		{#if refreshing}
			<LoadingSkeleton rows={5} />
		{:else}
			<ParserTable {parsers} onEdit={openEdit} onDelete={openDelete} />
		{/if}
	</Card>
</div>

<ParserFormModal
	bind:open={formOpen}
	parser={selectedParser}
	companies={data.companies}
	onSaved={refresh}
/>

<DeleteParserModal
	bind:open={deleteOpen}
	parser={selectedParser}
	onDeleted={refresh}
/>
