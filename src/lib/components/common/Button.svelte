<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
	type Size = 'sm' | 'md' | 'lg';

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		disabled = false,
		title = undefined,
		class: className = '',
		onclick,
		children
	}: {
		variant?: Variant;
		size?: Size;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		title?: string;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	} = $props();

	const variantClasses: Record<Variant, string> = {
		primary: 'bg-primary text-text-inverse hover:bg-primary-light-1 border-none',
		secondary: 'bg-background-pure dark:bg-background-pure-dark text-text hover:bg-background-toned-2 border border-gray',
		accent: 'bg-accent text-text-inverse hover:bg-accent-deep-0 border-none',
		ghost: 'bg-transparent hover:bg-background-toned-2 border-none',
		outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10'
	};

	const sizeClasses: Record<Size, string> = {
		sm: 'btn-sm text-xs px-3',
		md: 'btn-md text-sm px-4',
		lg: 'btn-lg text-base px-6'
	};
</script>

<button
	{type}
	{disabled}
	{title}
	class="btn font-secondary font-medium rounded-lg transition-all duration-300 ease-in-out {variantClasses[variant]} {sizeClasses[size]} {className}"
	{onclick}
>
	{@render children()}
</button>
