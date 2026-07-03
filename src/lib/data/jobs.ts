import type { Job } from '$lib/types';

export const jobs: Job[] = [
	{
		id: 'job-1',
		company: 'Anthropic',
		title: 'ML Infrastructure Engineer',
		location: 'San Francisco, CA',
		employmentType: 'Full-time',
		salary: '$180k – $250k',
		description:
			'Design and operate scalable ML training infrastructure. Work with researchers and platform teams to deliver reliable GPU clusters and data pipelines.',
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
		description:
			'Lead backend architecture for high-throughput commerce APIs. Mentor engineers and drive reliability improvements across core services.',
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
		description:
			'Operate large-scale observability systems. Improve incident response, capacity planning, and service-level objectives.',
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
		description:
			'Protect global edge network infrastructure. Build detection systems and respond to emerging threats.',
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
		description:
			'Engage developer communities worldwide. Create content, speak at events, and gather product feedback.',
		remote: true,
		experience: 'Mid',
		datePosted: '2026-06-27'
	},
	{
		id: 'job-6',
		company: 'Stripe',
		title: 'Payments Platform Engineer',
		location: 'Seattle, WA',
		employmentType: 'Full-time',
		salary: '$170k – $240k',
		description:
			'Build payment processing systems used by millions of businesses. Focus on reliability, compliance, and developer experience.',
		remote: false,
		experience: 'Senior',
		datePosted: '2026-06-26'
	},
	{
		id: 'job-7',
		company: 'Notion',
		title: 'Full Stack Developer',
		location: 'San Francisco, CA',
		employmentType: 'Full-time',
		salary: '$155k – $210k',
		description:
			'Ship features across the Notion product surface. Collaborate with design and product on delightful user experiences.',
		remote: false,
		experience: 'Mid',
		datePosted: '2026-06-25'
	},
	{
		id: 'job-8',
		company: 'Figma',
		title: 'Frontend Engineer',
		location: 'New York, NY',
		employmentType: 'Full-time',
		salary: '$165k – $225k',
		description:
			'Build performant canvas rendering and collaboration features. Push the boundaries of in-browser creative tools.',
		remote: true,
		experience: 'Senior',
		datePosted: '2026-06-24'
	},
	{
		id: 'job-9',
		company: 'Vercel',
		title: 'Platform Engineer',
		location: 'Remote',
		employmentType: 'Full-time',
		salary: '$150k – $205k',
		description:
			'Develop deployment infrastructure for the modern web. Improve build systems, edge functions, and developer workflows.',
		remote: true,
		experience: 'Mid',
		datePosted: '2026-06-23'
	},
	{
		id: 'job-10',
		company: 'Linear',
		title: 'Product Engineer',
		location: 'Remote',
		employmentType: 'Full-time',
		salary: '$145k – $195k',
		description:
			'Own end-to-end product features for issue tracking. Balance speed, craft, and technical excellence.',
		remote: true,
		experience: 'Mid',
		datePosted: '2026-06-22'
	},
	{
		id: 'job-11',
		company: 'Airbnb',
		title: 'Data Engineer',
		location: 'San Francisco, CA',
		employmentType: 'Full-time',
		salary: '$160k – $215k',
		description:
			'Build data pipelines powering marketplace insights. Ensure data quality and accessibility across teams.',
		remote: false,
		experience: 'Senior',
		datePosted: '2026-06-21'
	},
	{
		id: 'job-12',
		company: 'Spotify',
		title: 'Backend Engineer',
		location: 'Stockholm, Sweden',
		employmentType: 'Full-time',
		salary: '€80k – €110k',
		description:
			'Develop streaming infrastructure serving hundreds of millions of listeners. Optimize for latency and availability.',
		remote: false,
		experience: 'Mid',
		datePosted: '2026-06-20'
	}
];

export const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
export const experienceLevels = ['Junior', 'Mid', 'Senior', 'Staff', 'Principal'];
export const datePostedOptions = ['Last 24 hours', 'Last 3 days', 'Last week', 'Last month', 'Any time'];
export const salaryRanges = ['$50k+', '$80k+', '$100k+', '$120k+', '$150k+', '$200k+'];
