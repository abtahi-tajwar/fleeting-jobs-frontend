<script lang="ts">
	import Modal from '$lib/components/common/Modal.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import type { ParserTemplate } from '$lib/types/parser';
	import { deleteParserTemplate } from '$lib/api/parsers';
	import { ApiError } from '$lib/api/client';

	let {
		open = $bindable(false),
		parser = null,
		onDeleted
	}: {
		open?: boolean;
		parser?: ParserTemplate | null;
		onDeleted: () => void;
	} = $props();

	let deleting = $state(false);
	let error = $state('');

	$effect(() => {
		if (open) {
			error = '';
		}
	});

	async function handleDelete () {
		if (!parser) return;

		deleting = true;
		error = '';

		try {
			await deleteParserTemplate(parser.id);
			open = false;
			onDeleted();
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to delete parser template';
		} finally {
			deleting = false;
		}
	}
</script>

{#snippet footer()}
	<div class="flex justify-end gap-2">
		<Button variant="ghost" size="sm" onclick={() => (open = false)} disabled={deleting}>
			Cancel
		</Button>
		<Button variant="accent" size="sm" onclick={handleDelete} disabled={deleting}>
			{deleting ? 'Deleting...' : 'Delete'}
		</Button>
	</div>
{/snippet}

<Modal bind:open title="Delete Parser Template" size="sm" {footer}>
	{#if parser}
		<div class="space-y-3">
			{#if error}
				<div class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
					{error}
				</div>
			{/if}
			<p class="text-sm text-text-light">
				Are you sure you want to delete the parser template for
				<span class="font-semibold text-text dark:text-text-dark">{parser.companyName ?? `#${parser.id}`}</span>?
				This action cannot be undone.
			</p>
		</div>
	{/if}
</Modal>
