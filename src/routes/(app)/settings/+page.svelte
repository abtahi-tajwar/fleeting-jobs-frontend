<script lang="ts">
	import Card from '$lib/components/common/Card.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { resumeTemplates } from '$lib/data/resume';
	import { layoutStore } from '$lib/stores/layout.svelte';
	import { User, FileText, Key, Settings, Palette, Bell } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Settings | Fleeting Jobs</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold font-secondary text-text dark:text-text-dark">Settings</h1>
		<p class="mt-1 text-sm text-text-light dark:text-text-light-dark">
			Manage your account and preferences
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<Card title="Profile" subtitle="Your personal information">
			<div class="space-y-4">
				<div class="flex items-center gap-4">
					<div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
						<User size={28} class="text-primary" />
					</div>
					<div>
						<p class="font-semibold">Jane Doe</p>
						<p class="text-sm text-text-light">jane.doe@email.com</p>
					</div>
				</div>
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div>
						<label for="settings-name" class="mb-1 block text-xs text-text-light">Full Name</label>
						<input id="settings-name" type="text" value="Jane Doe" class="input w-full rounded-lg border-gray/60" />
					</div>
					<div>
						<label for="settings-email" class="mb-1 block text-xs text-text-light">Email</label>
						<input id="settings-email" type="email" value="jane.doe@email.com" class="input w-full rounded-lg border-gray/60" />
					</div>
					<div>
						<label for="settings-title" class="mb-1 block text-xs text-text-light">Job Title</label>
						<input id="settings-title" type="text" value="Software Engineer" class="input w-full rounded-lg border-gray/60" />
					</div>
					<div>
						<label for="settings-location" class="mb-1 block text-xs text-text-light">Location</label>
						<input id="settings-location" type="text" value="San Francisco, CA" class="input w-full rounded-lg border-gray/60" />
					</div>
				</div>
				<Button variant="primary" size="sm">Save Profile</Button>
			</div>
		</Card>

		<Card title="Resume Templates" subtitle="Manage your resume templates">
			<div class="space-y-2">
				{#each resumeTemplates as template (template.id)}
					<div class="flex items-center justify-between rounded-lg border border-gray/40 p-3">
						<div class="flex items-center gap-2">
							<FileText size={16} class="text-primary" />
							<span class="text-sm">{template.name}</span>
						</div>
						<Button variant="ghost" size="sm">Edit</Button>
					</div>
				{/each}
				<Button variant="outline" size="sm" class="mt-2">Add Template</Button>
			</div>
		</Card>

		<Card title="API Keys" subtitle="Connect external services">
			<div class="space-y-4">
				<div class="flex items-center gap-2 text-text-light">
					<Key size={16} />
					<span class="text-sm">API key management coming soon</span>
				</div>
				<div>
					<label for="api-key" class="mb-1 block text-xs text-text-light">OpenAI API Key</label>
					<input
						id="api-key"
						type="password"
						placeholder="sk-..."
						class="input w-full rounded-lg border-gray/60"
						disabled
					/>
				</div>
				<Button variant="secondary" size="sm" disabled>Save API Key</Button>
			</div>
		</Card>

		<Card title="Preferences" subtitle="Customize your experience">
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Palette size={16} class="text-text-light" />
						<span class="text-sm">Dark Mode</span>
					</div>
					<input
						type="checkbox"
						class="toggle toggle-primary toggle-sm"
						checked={layoutStore.darkMode}
						onchange={() => layoutStore.toggleTheme()}
					/>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Bell size={16} class="text-text-light" />
						<span class="text-sm">Email Notifications</span>
					</div>
					<input type="checkbox" class="toggle toggle-primary toggle-sm" checked />
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Settings size={16} class="text-text-light" />
						<span class="text-sm">Auto-save Applications</span>
					</div>
					<input type="checkbox" class="toggle toggle-primary toggle-sm" />
				</div>
				<div>
					<label for="default-template" class="mb-1 block text-xs text-text-light">Default Resume Template</label>
					<select id="default-template" class="select w-full rounded-lg border-gray/60">
						{#each resumeTemplates as template (template.id)}
							<option value={template.id}>{template.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</Card>
	</div>
</div>
