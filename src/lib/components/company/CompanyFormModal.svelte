<script lang="ts">
	import Modal from '$lib/components/common/Modal.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import type { Company, CompanyFormData } from '$lib/types/company';
	import {
		emptyCompanyForm,
		companyToFormData,
		validateCompanyForm,
		formDataToCreateInput,
		formDataToUpdateInput
	} from '$lib/types/company';
	import { createCompany, updateCompany } from '$lib/api/companies';
	import { ApiError } from '$lib/api/client';

	let {
		open = $bindable(false),
		company = null,
		onSaved
	}: {
		open?: boolean;
		company?: Company | null;
		onSaved: () => void;
	} = $props();

	let form = $state<CompanyFormData>(emptyCompanyForm());
	let fieldErrors = $state<Record<string, string>>({});
	let submitError = $state('');
	let submitting = $state(false);

	const isEditing = $derived(company !== null);
	const title = $derived(isEditing ? 'Edit Company' : 'Add Company');

	$effect(() => {
		if (open) {
			form = company ? companyToFormData(company) : emptyCompanyForm();
			fieldErrors = {};
			submitError = '';
		}
	});

	async function handleSubmit () {
		fieldErrors = validateCompanyForm(form);
		if (Object.keys(fieldErrors).length > 0) return;

		submitting = true;
		submitError = '';

		try {
			if (isEditing && company) {
				await updateCompany(company.id, formDataToUpdateInput(form));
			} else {
				await createCompany(formDataToCreateInput(form));
			}

			open = false;
			onSaved();
		} catch (error) {
			if (error instanceof ApiError && error.errors) {
				fieldErrors = error.errors;
			}
			submitError = error instanceof ApiError ? error.message : 'Failed to save company';
		} finally {
			submitting = false;
		}
	}
</script>

{#snippet footer()}
	<div class="flex justify-end gap-2">
		<Button variant="ghost" size="sm" onclick={() => (open = false)} disabled={submitting}>
			Cancel
		</Button>
		<Button variant="primary" size="sm" onclick={handleSubmit} disabled={submitting}>
			{submitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
		</Button>
	</div>
{/snippet}

<Modal bind:open {title} size="md" {footer}>
	<form class="space-y-4" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
		{#if submitError}
			<div class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
				{submitError}
			</div>
		{/if}

		<div>
			<label for="company-name" class="mb-1 block text-sm font-medium">Company Name</label>
			<input
				id="company-name"
				type="text"
				bind:value={form.name}
				placeholder="e.g. Stripe"
				class="input w-full rounded-lg border-gray/60 {fieldErrors.name ? 'border-red-400' : ''}"
			/>
			{#if fieldErrors.name}
				<p class="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
			{/if}
		</div>

		<div>
			<label for="company-listing-url" class="mb-1 block text-sm font-medium">Listing URL</label>
			<input
				id="company-listing-url"
				type="url"
				bind:value={form.listingUrl}
				placeholder="https://stripe.com/jobs"
				class="input w-full rounded-lg border-gray/60 {fieldErrors.listingUrl ? 'border-red-400' : ''}"
			/>
			{#if fieldErrors.listingUrl}
				<p class="mt-1 text-xs text-red-500">{fieldErrors.listingUrl}</p>
			{/if}
		</div>

		<div>
			<label for="company-url-template" class="mb-1 block text-sm font-medium">
				Single Page URL Template <span class="text-text-light">(optional)</span>
			</label>
			<input
				id="company-url-template"
				type="text"
				bind:value={form.singlePageUrlTemplate}
				placeholder="https://example.com/jobs/{'{id}'}"
				class="input w-full rounded-lg border-gray/60 font-mono text-sm"
			/>
		</div>

		<label class="flex cursor-pointer items-center gap-2">
			<input type="checkbox" bind:checked={form.enabled} class="checkbox checkbox-sm checkbox-primary" />
			<span class="text-sm">Enabled</span>
		</label>
	</form>
</Modal>
