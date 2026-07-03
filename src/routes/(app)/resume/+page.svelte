<script lang="ts">
	import Card from '$lib/components/common/Card.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { resumeTemplates } from '$lib/data/resume';
	import { FileText, Sparkles, Download } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Resume Generator | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Resume Generator</h1>
		<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
			Create tailored resumes for your job applications
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<Card title="Quick Generate" subtitle="Select a template and generate a resume">
			<div class="space-y-4">
				<div>
					<label for="resume-page-template" class="mb-1 block text-sm font-medium">Template</label>
					<select
						id="resume-page-template"
						class="select w-full rounded-lg border-gray/60 bg-background-toned-0"
					>
						{#each resumeTemplates as template (template.id)}
							<option value={template.id}>{template.name}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="resume-target-job" class="mb-1 block text-sm font-medium">Target Job (optional)</label>
					<input
						id="resume-target-job"
						type="text"
						placeholder="e.g. Senior Engineer at Stripe"
						class="input w-full rounded-lg border-gray/60"
					/>
				</div>
				<div class="flex gap-2">
					<Button variant="primary" size="sm">
						<Sparkles size={14} />
						Generate
					</Button>
					<Button variant="accent" size="sm">
						<Download size={14} />
						Download
					</Button>
				</div>
			</div>
		</Card>

		<Card title="Templates" subtitle="Available resume templates">
			<div class="space-y-3">
				{#each resumeTemplates as template (template.id)}
					<div
						class="flex items-center gap-3 rounded-lg border border-gray/40 p-3 hover:bg-background-toned-1/50 transition-colors cursor-pointer"
					>
						<div class="rounded-lg bg-primary/10 p-2">
							<FileText size={18} class="text-primary" />
						</div>
						<div>
							<p class="font-medium text-sm">{template.name}</p>
							<p class="text-xs text-text-light">{template.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>
