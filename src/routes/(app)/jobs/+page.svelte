<script lang="ts">
	import type { Job, JobFilters } from '$lib/types';
	import SearchBar from '$lib/components/common/SearchBar.svelte';
	import FilterPanel from '$lib/components/jobs/FilterPanel.svelte';
	import JobCard from '$lib/components/jobs/JobCard.svelte';
	import ResumeModal from '$lib/components/jobs/ResumeModal.svelte';
	import CoverLetterModal from '$lib/components/jobs/CoverLetterModal.svelte';
	import Pagination from '$lib/components/common/Pagination.svelte';
	import { jobs } from '$lib/data/jobs';

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

	const filteredJobs = $derived(() => {
		return jobs.filter((job) => {
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

	function openResumeModal(job: Job) {
		selectedJob = job;
		resumeModalOpen = true;
	}

	function openCoverLetterModal(job: Job) {
		selectedJob = job;
		coverLetterModalOpen = true;
	}

	function handleSearch() {
		currentPage = 1;
	}

	function handleReset() {
		currentPage = 1;
	}
</script>

<svelte:head>
	<title>Job Search | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Job Search</h1>
		<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
			Find and apply to opportunities tailored to your profile
		</p>
	</div>

	<SearchBar bind:value={filters.query} placeholder="Search jobs..." class="max-w-2xl" />

	<FilterPanel bind:filters onSearch={handleSearch} onReset={handleReset} />

	<div class="flex items-center justify-between">
		<p class="text-sm text-text-light">
			{filteredJobs().length} job{filteredJobs().length === 1 ? '' : 's'} found
		</p>
	</div>

	<div class="space-y-4">
		{#each paginatedJobs() as job (job.id)}
			<JobCard
				{job}
				onGenerateResume={openResumeModal}
				onGenerateCoverLetter={openCoverLetterModal}
				onApply={() => {}}
				onSave={() => {}}
			/>
		{:else}
			<p class="py-12 text-center text-text-light">No jobs match your search criteria.</p>
		{/each}
	</div>

	{#if filteredJobs().length > PAGE_SIZE}
		<Pagination bind:currentPage {totalPages} />
	{/if}
</div>

<ResumeModal bind:open={resumeModalOpen} job={selectedJob} />
<CoverLetterModal bind:open={coverLetterModalOpen} job={selectedJob} />
