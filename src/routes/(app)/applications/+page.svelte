<script lang="ts">
	import Card from '$lib/components/common/Card.svelte';
	import ApplicationTable from '$lib/components/applications/ApplicationTable.svelte';
	import { applications } from '$lib/data/applications';

	let statusFilter = $state('');
	let companyFilter = $state('');
</script>

<svelte:head>
	<title>Applications | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Applications</h1>
		<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
			Track and manage your job applications
		</p>
	</div>

	<Card title="All Applications" subtitle="{applications.length} total applications">
		<ApplicationTable
			{applications}
			bind:statusFilter
			bind:companyFilter
		/>
	</Card>
</div>
