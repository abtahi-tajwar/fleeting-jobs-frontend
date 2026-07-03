import type { Application } from '$lib/types';

export const applications: Application[] = [
	{
		id: 'app-1',
		company: 'Stripe',
		position: 'Senior Software Engineer',
		appliedDate: '2026-06-28',
		status: 'Interview',
		interviewDate: '2026-07-08',
		notes: 'Technical round scheduled with hiring manager'
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
		notes: 'Take-home assignment due Friday'
	},
	{
		id: 'app-5',
		company: 'Linear',
		position: 'Product Engineer',
		appliedDate: '2026-06-15',
		status: 'Rejected',
		notes: 'Moved forward with another candidate'
	},
	{
		id: 'app-6',
		company: 'Anthropic',
		position: 'ML Infrastructure Engineer',
		appliedDate: '2026-06-12',
		status: 'Offer',
		interviewDate: '2026-06-30',
		notes: 'Offer received, reviewing compensation package'
	},
	{
		id: 'app-7',
		company: 'Shopify',
		position: 'Staff Backend Developer',
		appliedDate: '2026-06-10',
		status: 'Withdrawn',
		notes: 'Accepted another offer'
	},
	{
		id: 'app-8',
		company: 'Datadog',
		position: 'Site Reliability Engineer',
		appliedDate: '2026-06-08',
		status: 'Interview',
		interviewDate: '2026-07-10',
		notes: 'On-site interview loop'
	},
	{
		id: 'app-9',
		company: 'Cloudflare',
		position: 'Security Engineer',
		appliedDate: '2026-06-05',
		status: 'Screening',
		notes: 'Phone screen completed'
	},
	{
		id: 'app-10',
		company: 'GitHub',
		position: 'Developer Advocate',
		appliedDate: '2026-06-01',
		status: 'Applied',
		notes: 'Submitted via referral'
	}
];

export const applicationStatuses = [
	'Applied',
	'Screening',
	'Interview',
	'Assessment',
	'Offer',
	'Rejected',
	'Withdrawn'
] as const;
