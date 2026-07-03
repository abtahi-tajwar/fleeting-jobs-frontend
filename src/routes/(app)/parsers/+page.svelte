<script lang="ts">
	import Card from '$lib/components/common/Card.svelte';
	import ParserTable from '$lib/components/parser/ParserTable.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { parsers } from '$lib/data/parsers';
	import { Plus } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Parsers | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Parser Management</h1>
			<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
				Manage companies whose job pages are parsed
			</p>
		</div>
		<Button variant="primary" size="md">
			<Plus size={16} />
			Add Parser
		</Button>
	</div>

	<Card title="Active Parsers" subtitle="{parsers.length} parsers configured">
		<ParserTable {parsers} />
	</Card>
</div>
