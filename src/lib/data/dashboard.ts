import type { DashboardStats, Application, Job } from '$lib/types';

export const dashboardStats: DashboardStats = {
	totalJobs: 1247,
	applicationsSent: 38,
	resumesGenerated: 52,
	coverLettersGenerated: 41,
	trackedCompanies: 18,
	activeParsers: 6
};

export const recentApplications: Application[] = [
	{
		id: 'app-1',
		company: 'Stripe',
		position: 'Senior Software Engineer',
		appliedDate: '2026-06-28',
		status: 'Interview',
		interviewDate: '2026-07-08',
		notes: 'Technical round scheduled'
	},
	{
		id: 'app-2',
		company: 'Notion',
		position: 'Full Stack Developer',
		appliedDate: '2026-06-25',
		status: 'Screening',
		notes: 'Recruiter follow-up pending'
	},
	{
		id: 'app-3',
		company: 'Figma',
		position: 'Frontend Engineer',
		appliedDate: '2026-06-22',
		status: 'Applied',
		notes: ''
	},
	{
		id: 'app-4',
		company: 'Vercel',
		position: 'Platform Engineer',
		appliedDate: '2026-06-18',
		status: 'Assessment',
		interviewDate: '2026-07-05',
		notes: 'Take-home due Friday'
	},
	{
		id: 'app-5',
		company: 'Linear',
		position: 'Product Engineer',
		appliedDate: '2026-06-15',
		status: 'Rejected',
		notes: 'Moved forward with another candidate'
	}
];

export const recentJobs: Job[] = [
	{
		id: 'job-1',
		company: 'Anthropic',
		title: 'ML Infrastructure Engineer',
		location: 'San Francisco, CA',
		employmentType: 'Full-time',
		salary: '$180k – $250k',
		description: 'Build scalable ML infrastructure.',
		remote: false,
		experience: 'Senior',
		datePosted: '2026-07-01'
	},
	{
		id: 'job-2',
		company: 'Shopify',
		title: 'Staff Backend Developer',
		location: 'Remote',
		employmentType: 'Full-time',
		salary: '$160k – $220k',
		description: 'Design high-throughput commerce APIs.',
		remote: true,
		experience: 'Staff',
		datePosted: '2026-06-30'
	},
	{
		id: 'job-3',
		company: 'Datadog',
		title: 'Site Reliability Engineer',
		location: 'New York, NY',
		employmentType: 'Full-time',
		salary: '$150k – $200k',
		description: 'Operate large-scale observability systems.',
		remote: false,
		experience: 'Mid',
		datePosted: '2026-06-29'
	},
	{
		id: 'job-4',
		company: 'Cloudflare',
		title: 'Security Engineer',
		location: 'Austin, TX',
		employmentType: 'Full-time',
		salary: '$140k – $190k',
		description: 'Protect global edge network infrastructure.',
		remote: true,
		experience: 'Senior',
		datePosted: '2026-06-28'
	},
	{
		id: 'job-5',
		company: 'GitHub',
		title: 'Developer Advocate',
		location: 'Remote',
		employmentType: 'Full-time',
		salary: '$130k – $175k',
		description: 'Engage developer communities worldwide.',
		remote: true,
		experience: 'Mid',
		datePosted: '2026-06-27'
	}
];
