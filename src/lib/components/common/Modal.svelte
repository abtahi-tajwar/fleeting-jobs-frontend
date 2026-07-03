<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		title,
		size = 'md',
		children,
		footer
	}: {
		open?: boolean;
		title: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		children: Snippet;
		footer?: Snippet;
	} = $props();

	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-2xl',
		lg: 'max-w-4xl',
		xl: 'max-w-6xl'
	};

	function close() {
		open = false;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
		onclick={handleBackdropClick}
		role="presentation"
	>
		<div
			class="w-full {sizeClasses[size]} rounded-xl bg-background-pure dark:bg-background-pure-dark shadow-2xl border border-gray/50 flex flex-col max-h-[90vh]"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div class="flex items-center justify-between border-b border-gray/50 p-4">
				<h2 id="modal-title" class="text-lg font-semibold font-secondary text-text dark:text-text-dark">
					{title}
				</h2>
				<button
					class="btn btn-circle btn-ghost btn-sm border-none"
					onclick={close}
					aria-label="Close modal"
				>
					<X size={18} />
				</button>
			</div>
			<div class="flex-1 overflow-y-auto p-4">
				{@render children()}
			</div>
			{#if footer}
				<div class="border-t border-gray/50 p-4">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
