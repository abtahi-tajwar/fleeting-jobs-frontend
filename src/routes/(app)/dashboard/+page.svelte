<script lang="ts">
	import DashboardCard from '$lib/components/dashboard/DashboardCard.svelte';
	import RecentApplicationsTable from '$lib/components/dashboard/RecentApplicationsTable.svelte';
	import RecentJobsList from '$lib/components/dashboard/RecentJobsList.svelte';
	import Card from '$lib/components/common/Card.svelte';
	import { dashboardStats, recentApplications, recentJobs } from '$lib/data/dashboard';
</script>

<svelte:head>
	<title>Dashboard | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Dashboard</h1>
		<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
			Overview of your job search activity
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
		<DashboardCard label="Total Jobs" value={dashboardStats.totalJobs} icon="briefcase" trend="+124 this week" />
		<DashboardCard label="Applications Sent" value={dashboardStats.applicationsSent} icon="send" trend="+5 this month" />
		<DashboardCard label="Resumes Generated" value={dashboardStats.resumesGenerated} icon="file-text" />
		<DashboardCard label="Cover Letters Generated" value={dashboardStats.coverLettersGenerated} icon="mail" />
		<DashboardCard label="Tracked Companies" value={dashboardStats.trackedCompanies} icon="building" />
		<DashboardCard label="Active Parsers" value={dashboardStats.activeParsers} icon="bot" />
	</div>

	<Card title="Recent Applications" subtitle="Your latest job applications">
		<RecentApplicationsTable applications={recentApplications} />
	</Card>

	<Card title="Recent Jobs" subtitle="Latest opportunities from your search">
		<RecentJobsList jobs={recentJobs} />
	</Card>
</div>
