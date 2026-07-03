<script lang="ts">
	import type { ApplicationStatus, ParserStatus } from '$lib/types';

	let { status }: { status: ApplicationStatus | ParserStatus | string } = $props();

	const applicationColors: Record<string, string> = {
		Applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
		Screening: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
		Interview: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
		Assessment: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
		Offer: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
		Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
		Withdrawn: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
	};

	const parserColors: Record<string, string> = {
		active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
		inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
		error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
		pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
	};

	const colorClass = $derived(
		applicationColors[status] ?? parserColors[status] ?? 'bg-gray-100 text-gray-600'
	);

	const displayLabel = $derived(
		status.charAt(0).toUpperCase() + status.slice(1)
	);
</script>

<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {colorClass}">
	{displayLabel}
</span>
