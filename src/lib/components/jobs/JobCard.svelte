<script lang="ts">
	import type { Job } from '$lib/types';
	import Button from '$lib/components/common/Button.svelte';
	import { MapPin, Building2, Bookmark, BookmarkCheck } from 'lucide-svelte';

	let {
		job,
		onGenerateResume,
		onGenerateCoverLetter,
		onApply,
		onSave
	}: {
		job: Job;
		onGenerateResume: (job: Job) => void;
		onGenerateCoverLetter: (job: Job) => void;
		onApply: (job: Job) => void;
		onSave: (job: Job) => void;
	} = $props();

	let saved = $state(false);

	$effect(() => {
		saved = job.saved ?? false;
	});

	function handleSave() {
		saved = !saved;
		onSave(job);
	}
</script>

<div
	class="rounded-xl bg-background-pure dark:bg-background-pure-dark border border-gray/50 p-5 shadow-sm hover:shadow-md transition-all duration-300"
>
	<div class="flex gap-4">
		<div
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg"
		>
			{job.company.charAt(0)}
		</div>
		<div class="flex-1 min-w-0">
			<div class="flex flex-wrap items-start justify-between gap-2">
				<div>
					<h3 class="font-semibold text-text dark:text-text-dark">{job.title}</h3>
					<div class="mt-1 flex flex-wrap items-center gap-3 text-sm text-text-light dark:text-text-light-dark">
						<span class="flex items-center gap-1">
							<Building2 size={14} />
							{job.company}
						</span>
						<span class="flex items-center gap-1">
							<MapPin size={14} />
							{job.location}
						</span>
					</div>
				</div>
				<span class="rounded-full bg-background-toned-2 px-2.5 py-0.5 text-xs font-medium">
					{job.employmentType}
				</span>
			</div>

			<p class="mt-2 text-sm font-medium text-primary">{job.salary}</p>
			<p class="mt-2 text-sm text-text-light dark:text-text-light-dark line-clamp-2">
				{job.description}
			</p>

			<div class="mt-4 flex flex-wrap gap-2">
				<Button variant="outline" size="sm" onclick={() => onGenerateResume(job)}>
					Generate Resume
				</Button>
				<Button variant="outline" size="sm" onclick={() => onGenerateCoverLetter(job)}>
					Generate Cover Letter
				</Button>
				<Button variant="primary" size="sm" onclick={() => onApply(job)}>Apply</Button>
				<Button variant="ghost" size="sm" onclick={handleSave}>
					{#if saved}
						<BookmarkCheck size={14} class="text-primary" />
					{:else}
						<Bookmark size={14} />
					{/if}
					Save
				</Button>
			</div>
		</div>
	</div>
</div>
