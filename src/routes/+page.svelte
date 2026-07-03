<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/dashboard');
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="loading loading-spinner loading-lg text-primary"></div>
</div>
