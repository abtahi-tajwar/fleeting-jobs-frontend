<script lang="ts">
	import Modal from '$lib/components/common/Modal.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import type { Company } from '$lib/types/company';
	import type { ParserFormData, ParserTemplate } from '$lib/types/parser';
	import { emptyParserForm, parserToFormData, parseConfigText } from '$lib/types/parser';
	import { createParserTemplate, updateParserTemplate } from '$lib/api/parsers';
	import { ApiError } from '$lib/api/client';

	let {
		open = $bindable(false),
		parser = null,
		companies,
		onSaved
	}: {
		open?: boolean;
		parser?: ParserTemplate | null;
		companies: Company[];
		onSaved: () => void;
	} = $props();

	let form = $state<ParserFormData>(emptyParserForm());
	let fieldErrors = $state<Record<string, string>>({});
	let submitError = $state('');
	let submitting = $state(false);

	const isEditing = $derived(parser !== null);
	const title = $derived(isEditing ? 'Edit Parser Template' : 'Add Parser Template');

	$effect(() => {
		if (open) {
			form = parser ? parserToFormData(parser) : emptyParserForm();
			fieldErrors = {};
			submitError = '';
		}
	});

	function validate (): { companyId: number; config: Record<string, unknown> } | null {
		const errors: Record<string, string> = {};

		if (form.companyId == null) {
			errors.companyId = 'Company is required';
		}

		const parsed = parseConfigText(form.configText);
		if (parsed.error) {
			errors.config = parsed.error;
		}

		fieldErrors = errors;

		if (Object.keys(errors).length > 0 || form.companyId == null || !parsed.config) {
			return null;
		}

		return { companyId: form.companyId, config: parsed.config };
	}

	async function handleSubmit () {
		const valid = validate();
		if (!valid) return;

		submitting = true;
		submitError = '';

		try {
			if (isEditing && parser) {
				await updateParserTemplate(parser.id, {
					companyId: valid.companyId,
					config: valid.config
				});
			} else {
				await createParserTemplate({
					companyId: valid.companyId,
					config: valid.config
				});
			}

			open = false;
			onSaved();
		} catch (error) {
			if (error instanceof ApiError && error.errors) {
				fieldErrors = { ...fieldErrors, ...error.errors };
			}
			submitError = error instanceof ApiError ? error.message : 'Failed to save parser template';
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

<Modal bind:open {title} size="lg" {footer}>
	<div class="space-y-4">
		{#if submitError}
			<div class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
				{submitError}
			</div>
		{/if}

		{#if companies.length === 0}
			<div class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300">
				You need to create a company first before adding a parser template.
			</div>
		{/if}

		<div>
			<label for="parser-company" class="mb-1 block text-sm font-medium">Company</label>
			<select
				id="parser-company"
				bind:value={form.companyId}
				class="select w-full rounded-lg border-gray/60 {fieldErrors.companyId ? 'border-red-400' : ''}"
			>
				<option value={null} disabled>Select a company</option>
				{#each companies as company (company.id)}
					<option value={company.id}>{company.name} (#{company.id})</option>
				{/each}
			</select>
			{#if fieldErrors.companyId}
				<p class="mt-1 text-xs text-red-500">{fieldErrors.companyId}</p>
			{/if}
		</div>

		<div>
			<label for="parser-config" class="mb-1 block text-sm font-medium">
				Parser Config <span class="text-text-light">(JSON)</span>
			</label>
			<textarea
				id="parser-config"
				bind:value={form.configText}
				rows="16"
				spellcheck="false"
				class="textarea w-full rounded-lg border-gray/60 font-mono text-xs leading-relaxed {fieldErrors.config ? 'border-red-400' : ''}"
			></textarea>
			{#if fieldErrors.config}
				<p class="mt-1 text-xs text-red-500">{fieldErrors.config}</p>
			{:else}
				<p class="mt-1 text-xs text-text-light">
					Define the scraping configuration as a JSON object (selectors, pagination, etc.).
				</p>
			{/if}
		</div>
	</div>
</Modal>
