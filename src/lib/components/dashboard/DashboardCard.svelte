<script lang="ts">
	import {
		Briefcase,
		Send,
		FileText,
		Mail,
		Building2,
		Bot
	} from 'lucide-svelte';

	const iconMap = {
		briefcase: Briefcase,
		send: Send,
		'file-text': FileText,
		mail: Mail,
		building: Building2,
		bot: Bot
	} as const;

	type IconName = keyof typeof iconMap;

	let {
		label,
		value,
		icon,
		trend
	}: {
		label: string;
		value: number | string;
		icon: IconName;
		trend?: string;
	} = $props();

	const Icon = $derived(iconMap[icon]);
</script>

<div
	class="rounded-xl bg-background-pure dark:bg-background-pure-dark p-5 shadow-sm border border-gray/50 transition-all duration-300 hover:shadow-md"
>
	<div class="flex items-start justify-between">
		<div>
			<p class="text-sm text-text-light dark:text-text-light-dark">{label}</p>
			<p class="mt-1 text-2xl font-bold text-text dark:text-text-dark font-secondary">{value}</p>
			{#if trend}
				<p class="mt-1 text-xs text-primary">{trend}</p>
			{/if}
		</div>
		<div class="rounded-lg bg-primary/10 p-2.5">
			<Icon size={20} class="text-primary" />
		</div>
	</div>
</div>
