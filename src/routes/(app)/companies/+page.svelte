<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Card from '$lib/components/common/Card.svelte';
	import CompanyTable from '$lib/components/company/CompanyTable.svelte';
	import CompanyFormModal from '$lib/components/company/CompanyFormModal.svelte';
	import DeleteCompanyModal from '$lib/components/company/DeleteCompanyModal.svelte';
	import LoadingSkeleton from '$lib/components/common/LoadingSkeleton.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { toggleCompanyEnabled } from '$lib/api/companies';
	import { getErrorMessage } from '$lib/api/client';
	import type { Company } from '$lib/types/company';
	import { Plus, RefreshCw } from 'lucide-svelte';

	let { data } = $props();

	let formOpen = $state(false);
	let deleteOpen = $state(false);
	let selectedCompany = $state<Company | null>(null);
	let actionError = $state('');
	let refreshing = $state(false);

	async function refresh () {
		refreshing = true;
		actionError = '';
		await invalidateAll();
		refreshing = false;
	}

	function openCreate () {
		selectedCompany = null;
		formOpen = true;
	}

	function openEdit (company: Company) {
		selectedCompany = company;
		formOpen = true;
	}

	function openDelete (company: Company) {
		selectedCompany = company;
		deleteOpen = true;
	}

	async function handleToggleEnabled (company: Company) {
		actionError = '';

		try {
			await toggleCompanyEnabled(company);
			await invalidateAll();
		} catch (error) {
			actionError = getErrorMessage(error);
		}
	}
</script>

<svelte:head>
	<title>Companies | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Companies</h1>
			<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
				Manage companies whose job pages are parsed
			</p>
		</div>
		<div class="flex gap-2">
			<Button variant="ghost" size="md" onclick={refresh} disabled={refreshing}>
				<RefreshCw size={16} class={refreshing ? 'animate-spin' : ''} />
				Refresh
			</Button>
			<Button variant="primary" size="md" onclick={openCreate}>
				<Plus size={16} />
				Add Company
			</Button>
		</div>
	</div>

	{#if data.error}
		<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
			<p class="font-medium">Failed to load companies</p>
			<p class="mt-1">{data.error}</p>
			<p class="mt-2 text-xs">Make sure the backend is running at {import.meta.env.PUBLIC_API_BASE_URL ?? 'http://localhost:8080'}</p>
		</div>
	{/if}

	{#if actionError}
		<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
			{actionError}
		</div>
	{/if}

	<Card title="Configured Companies" subtitle="{data.companies.length} companies">
		{#if refreshing}
			<LoadingSkeleton rows={5} />
		{:else}
			<CompanyTable
				companies={data.companies}
				onEdit={openEdit}
				onDelete={openDelete}
				onToggleEnabled={handleToggleEnabled}
			/>
		{/if}
	</Card>
</div>

<CompanyFormModal
	bind:open={formOpen}
	company={selectedCompany}
	onSaved={refresh}
/>

<DeleteCompanyModal
	bind:open={deleteOpen}
	company={selectedCompany}
	onDeleted={refresh}
/>
