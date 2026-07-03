import type { Parser } from '$lib/types';

export const parsers: Parser[] = [
	{
		id: 'parser-1',
		company: 'Stripe',
		parserName: 'stripe-careers',
		status: 'active',
		lastUpdated: '2026-07-02 14:30',
		jobsFound: 42
	},
	{
		id: 'parser-2',
		company: 'Notion',
		parserName: 'notion-jobs',
		status: 'active',
		lastUpdated: '2026-07-02 12:15',
		jobsFound: 18
	},
	{
		id: 'parser-3',
		company: 'Figma',
		parserName: 'figma-boards',
		status: 'inactive',
		lastUpdated: '2026-06-28 09:00',
		jobsFound: 12
	},
	{
		id: 'parser-4',
		company: 'Vercel',
		parserName: 'vercel-greenhouse',
		status: 'active',
		lastUpdated: '2026-07-01 18:45',
		jobsFound: 9
	},
	{
		id: 'parser-5',
		company: 'Linear',
		parserName: 'linear-ashby',
		status: 'error',
		lastUpdated: '2026-06-25 11:20',
		jobsFound: 0
	},
	{
		id: 'parser-6',
		company: 'Anthropic',
		parserName: 'anthropic-lever',
		status: 'active',
		lastUpdated: '2026-07-02 08:00',
		jobsFound: 24
	},
	{
		id: 'parser-7',
		company: 'Shopify',
		parserName: 'shopify-workday',
		status: 'pending',
		lastUpdated: '2026-07-02 06:30',
		jobsFound: 0
	},
	{
		id: 'parser-8',
		company: 'Datadog',
		parserName: 'datadog-greenhouse',
		status: 'active',
		lastUpdated: '2026-07-01 22:10',
		jobsFound: 31
	}
];
