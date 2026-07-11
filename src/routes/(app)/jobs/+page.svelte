<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Job, JobFilters } from '$lib/types';
	import SearchBar from '$lib/components/common/SearchBar.svelte';
	import FilterPanel from '$lib/components/jobs/FilterPanel.svelte';
	import JobCard from '$lib/components/jobs/JobCard.svelte';
	import ResumeModal from '$lib/components/jobs/ResumeModal.svelte';
	import CoverLetterModal from '$lib/components/jobs/CoverLetterModal.svelte';
	import Pagination from '$lib/components/common/Pagination.svelte';
	import LoadingSkeleton from '$lib/components/common/LoadingSkeleton.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { RefreshCw } from 'lucide-svelte';

	let { data } = $props();

	const PAGE_SIZE = 6;

	let filters = $state<JobFilters>({
		query: '',
		company: '',
		location: '',
		remote: false,
		employmentType: '',
		experience: '',
		salary: '',
		datePosted: ''
	});

	let currentPage = $state(1);
	let resumeModalOpen = $state(false);
	let coverLetterModalOpen = $state(false);
	let selectedJob = $state<Job | null>(null);
	let refreshing = $state(false);

	const filteredJobs = $derived(() => {
		return data.jobs.filter((job) => {
			const q = filters.query.toLowerCase();
			const matchesQuery =
				!q ||
				job.title.toLowerCase().includes(q) ||
				job.company.toLowerCase().includes(q) ||
				job.description.toLowerCase().includes(q);
			const matchesCompany =
				!filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase());
			const matchesLocation =
				!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
			const matchesRemote = !filters.remote || job.remote;
			const matchesEmployment = !filters.employmentType || job.employmentType === filters.employmentType;
			const matchesExperience = !filters.experience || job.experience === filters.experience;
			return (
				matchesQuery &&
				matchesCompany &&
				matchesLocation &&
				matchesRemote &&
				matchesEmployment &&
				matchesExperience
			);
		});
	});

	const totalPages = $derived(Math.max(1, Math.ceil(filteredJobs().length / PAGE_SIZE)));

	const paginatedJobs = $derived(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return filteredJobs().slice(start, start + PAGE_SIZE);
	});

	async function refresh () {
		refreshing = true;
		await invalidateAll();
		refreshing = false;
	}

	function openResumeModal (job: Job) {
		selectedJob = job;
		resumeModalOpen = true;
	}

	function openCoverLetterModal (job: Job) {
		selectedJob = job;
		coverLetterModalOpen = true;
	}

	function handleApply (job: Job) {
		if (job.url) {
			window.open(job.url, '_blank', 'noopener,noreferrer');
		}
	}

	function handleSearch () {
		currentPage = 1;
	}

	function handleReset () {
		currentPage = 1;
	}
</script>

<svelte:head>
	<title>Job Search | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Job Search</h1>
			<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
				Find and apply to opportunities tailored to your profile
			</p>
		</div>
		<Button variant="ghost" size="md" onclick={refresh} disabled={refreshing}>
			<RefreshCw size={16} class={refreshing ? 'animate-spin' : ''} />
			Refresh
		</Button>
	</div>

	{#if data.error}
		<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
			<p class="font-medium">Failed to load jobs</p>
			<p class="mt-1">{data.error}</p>
			<p class="mt-2 text-xs">Make sure the backend is running at {import.meta.env.PUBLIC_API_BASE_URL ?? 'http://localhost:8080'}</p>
		</div>
	{/if}

	<SearchBar bind:value={filters.query} placeholder="Search jobs..." class="max-w-2xl" />

	<FilterPanel bind:filters onSearch={handleSearch} onReset={handleReset} />

	<div class="flex items-center justify-between">
		<p class="text-sm text-text-light">
			{filteredJobs().length} job{filteredJobs().length === 1 ? '' : 's'} found
		</p>
		{#if data.jobs.length > 0}
			<p class="text-xs text-text-light">Some fields use placeholder data until the API provides them</p>
		{/if}
	</div>

	{#if refreshing}
		<LoadingSkeleton rows={6} />
	{:else}
		<div class="space-y-4">
			{#each paginatedJobs() as job (job.id)}
				<JobCard
					{job}
					onGenerateResume={openResumeModal}
					onGenerateCoverLetter={openCoverLetterModal}
					onApply={handleApply}
					onSave={() => {}}
				/>
			{:else}
				<p class="py-12 text-center text-text-light">
					{data.error ? 'Unable to display jobs.' : 'No jobs match your search criteria.'}
				</p>
			{/each}
		</div>

		{#if filteredJobs().length > PAGE_SIZE}
			<Pagination bind:currentPage {totalPages} />
		{/if}
	{/if}
</div>

<ResumeModal bind:open={resumeModalOpen} job={selectedJob} />
<CoverLetterModal bind:open={coverLetterModalOpen} job={selectedJob} />
