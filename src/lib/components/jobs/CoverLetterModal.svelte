<script lang="ts">
	import type { Job, CoverLetterTone, CoverLetterLength } from '$lib/types';
	import Modal from '$lib/components/common/Modal.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { Download, Sparkles } from 'lucide-svelte';

	let {
		open = $bindable(false),
		job
	}: {
		open?: boolean;
		job: Job | null;
	} = $props();

	const tones: CoverLetterTone[] = ['Professional', 'Friendly', 'Enthusiastic', 'Formal'];
	const lengths: CoverLetterLength[] = ['Short', 'Medium', 'Long'];

	let tone = $state<CoverLetterTone>('Professional');
	let length = $state<CoverLetterLength>('Medium');
	let generated = $state(false);

	const previewPlaceholder = `Dear Hiring Manager,

I am writing to express my strong interest in the position. With my background
in software engineering and passion for building impactful products, I am
confident I would be a valuable addition to your team.

Throughout my career, I have consistently delivered high-quality solutions
while collaborating effectively with cross-functional teams. I am particularly
drawn to your company's mission and the opportunity to contribute to meaningful work.

I would welcome the chance to discuss how my experience aligns with your needs.
Thank you for considering my application.

Sincerely,
Jane Doe`;

	function handleGenerate() {
		generated = true;
	}

	$effect(() => {
		if (!open) {
			generated = false;
			tone = 'Professional';
			length = 'Medium';
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

<Modal bind:open title="Generate Cover Letter" size="lg" {footer}>
	{#if job}
		<div class="space-y-4">
			<div class="rounded-lg bg-background-toned-1 p-3 text-sm">
				<span class="text-text-light">Cover letter for: </span>
				<span class="font-medium">{job.title} at {job.company}</span>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label for="cover-tone" class="mb-1 block text-sm font-medium">Tone</label>
					<select
						id="cover-tone"
						bind:value={tone}
						class="select w-full rounded-lg border-gray/60 bg-background-toned-0"
					>
						{#each tones as t}
							<option value={t}>{t}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="cover-length" class="mb-1 block text-sm font-medium">Length</label>
					<select
						id="cover-length"
						bind:value={length}
						class="select w-full rounded-lg border-gray/60 bg-background-toned-0"
					>
						{#each lengths as l}
							<option value={l}>{l}</option>
						{/each}
					</select>
				</div>
			</div>

			<div>
				<h4 class="mb-2 text-sm font-semibold">Preview</h4>
				<div
					class="h-72 overflow-y-auto rounded-lg border border-gray/50 bg-background-pure p-4 text-sm leading-relaxed whitespace-pre-line
						{generated ? 'text-text' : 'text-text-light italic'}"
				>
					{generated ? previewPlaceholder : 'Configure tone and length, then click Generate to preview...'}
				</div>
			</div>
		</div>
	{/if}
</Modal>
