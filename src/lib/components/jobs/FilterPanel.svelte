<script lang="ts">
	import type { JobFilters } from '$lib/types';
	import { employmentTypes, experienceLevels, datePostedOptions, salaryRanges } from '$lib/data/jobs';
	import Button from '$lib/components/common/Button.svelte';
	import { RotateCcw } from 'lucide-svelte';

	let {
		filters = $bindable(),
		onSearch,
		onReset
	}: {
		filters: JobFilters;
		onSearch?: () => void;
		onReset?: () => void;
	} = $props();

	const defaultFilters: JobFilters = {
		query: '',
		company: '',
		location: '',
		remote: false,
		employmentType: '',
		experience: '',
		salary: '',
		datePosted: ''
	};

	function reset() {
		Object.assign(filters, defaultFilters);
		onReset?.();
	}
</script>

<div class="rounded-xl bg-background-pure dark:bg-background-pure-dark border border-gray/50 p-5 shadow-sm">
	<h3 class="mb-4 text-sm font-semibold text-text dark:text-text-dark font-secondary">Filters</h3>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<div>
			<label for="filter-company" class="mb-1 block text-xs text-text-light">Company</label>
			<input
				id="filter-company"
				type="text"
				bind:value={filters.company}
				placeholder="e.g. Stripe"
				class="input input-sm w-full rounded-lg border-gray/60 bg-background-toned-0"
			/>
		</div>
		<div>
			<label for="filter-location" class="mb-1 block text-xs text-text-light">Location</label>
			<input
				id="filter-location"
				type="text"
				bind:value={filters.location}
				placeholder="e.g. San Francisco"
				class="input input-sm w-full rounded-lg border-gray/60 bg-background-toned-0"
			/>
		</div>
		<div>
			<label for="filter-employment" class="mb-1 block text-xs text-text-light">Employment Type</label>
			<select
				id="filter-employment"
				bind:value={filters.employmentType}
				class="select select-sm w-full rounded-lg border-gray/60 bg-background-toned-0"
			>
				<option value="">Any</option>
				{#each employmentTypes as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="filter-experience" class="mb-1 block text-xs text-text-light">Experience</label>
			<select
				id="filter-experience"
				bind:value={filters.experience}
				class="select select-sm w-full rounded-lg border-gray/60 bg-background-toned-0"
			>
				<option value="">Any</option>
				{#each experienceLevels as level}
					<option value={level}>{level}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="filter-salary" class="mb-1 block text-xs text-text-light">Salary</label>
			<select
				id="filter-salary"
				bind:value={filters.salary}
				class="select select-sm w-full rounded-lg border-gray/60 bg-background-toned-0"
			>
				<option value="">Any</option>
				{#each salaryRanges as range}
					<option value={range}>{range}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="filter-date" class="mb-1 block text-xs text-text-light">Date Posted</label>
			<select
				id="filter-date"
				bind:value={filters.datePosted}
				class="select select-sm w-full rounded-lg border-gray/60 bg-background-toned-0"
			>
				<option value="">Any time</option>
				{#each datePostedOptions as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</div>
		<div class="flex items-end">
			<label class="flex cursor-pointer items-center gap-2 pb-2">
				<input type="checkbox" bind:checked={filters.remote} class="checkbox checkbox-sm checkbox-primary" />
				<span class="text-sm text-text dark:text-text-dark">Remote only</span>
			</label>
		</div>
	</div>
	<div class="mt-4 flex gap-2">
		<Button variant="primary" size="sm" onclick={() => onSearch?.()}>Search</Button>
		<Button variant="ghost" size="sm" onclick={reset}>
			<RotateCcw size={14} />
			Reset
		</Button>
	</div>
</div>
