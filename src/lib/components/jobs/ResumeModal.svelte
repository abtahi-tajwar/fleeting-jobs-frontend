<script lang="ts">
	import type { Job } from '$lib/types';
	import Modal from '$lib/components/common/Modal.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { resumeTemplates, resumePreviewPlaceholder, jobDescriptionPreviewPlaceholder } from '$lib/data/resume';
	import { Download, Sparkles } from 'lucide-svelte';

	let {
		open = $bindable(false),
		job
	}: {
		open?: boolean;
		job: Job | null;
	} = $props();

	let selectedTemplate = $state(resumeTemplates[0].id);
	let generated = $state(false);

	function handleGenerate() {
		generated = true;
	}

	$effect(() => {
		if (!open) {
			generated = false;
			selectedTemplate = resumeTemplates[0].id;
		}
	});
</script>

{#snippet footer()}
	<div class="flex justify-end gap-2">
		<Button variant="ghost" size="sm" onclick={() => (open = false)}>Cancel</Button>
		<Button variant="primary" size="sm" onclick={handleGenerate}>
			<Sparkles size={14} />
			Generate
		</Button>
		{#if generated}
			<Button variant="accent" size="sm">
				<Download size={14} />
				Download
			</Button>
		{/if}
	</div>
{/snippet}

<Modal bind:open title="Generate Resume" size="xl" {footer}>
	{#if job}
		<div class="space-y-4">
			<div class="rounded-lg bg-background-toned-1 p-3 text-sm">
				<span class="text-text-light">Generating resume for: </span>
				<span class="font-medium">{job.title} at {job.company}</span>
			</div>

			<div>
				<label for="resume-template" class="mb-1 block text-sm font-medium">Resume Template</label>
				<select
					id="resume-template"
					bind:value={selectedTemplate}
					class="select w-full rounded-lg border-gray/60 bg-background-toned-0"
				>
					{#each resumeTemplates as template (template.id)}
						<option value={template.id}>{template.name} — {template.description}</option>
					{/each}
				</select>
			</div>

			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div>
					<h4 class="mb-2 text-sm font-semibold">Job Description Preview</h4>
					<div
						class="h-64 overflow-y-auto rounded-lg border border-gray/50 bg-background-toned-0 p-4 text-xs leading-relaxed text-text-light whitespace-pre-line"
					>
						{jobDescriptionPreviewPlaceholder}
					</div>
				</div>
				<div>
					<h4 class="mb-2 text-sm font-semibold">Resume Preview</h4>
					<div
						class="h-64 overflow-y-auto rounded-lg border border-gray/50 bg-background-pure p-4 text-xs leading-relaxed whitespace-pre-line font-mono
							{generated ? 'text-text' : 'text-text-light italic'}"
					>
						{generated ? resumePreviewPlaceholder : 'Click Generate to preview your tailored resume...'}
					</div>
				</div>
			</div>
		</div>
	{/if}
</Modal>
