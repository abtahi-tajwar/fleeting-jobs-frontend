import type { EmploymentType, Job } from '$lib/types';

export interface JobListItem {
	id: number;
	title: string;
	url: string;
}

const LOCATIONS = ['Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA'];
const EMPLOYMENT_TYPES: EmploymentType[] = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
const SALARIES = ['$120k – $160k', '$150k – $200k', '$180k – $240k', '$100k – $140k', 'Competitive'];
const EXPERIENCES = ['Junior', 'Mid', 'Senior', 'Staff'];
const DESCRIPTIONS = [
	'Join a growing team building impactful products. Collaborate across engineering, design, and product.',
	'Work on scalable systems serving millions of users. Strong focus on reliability and developer experience.',
	'Contribute to core platform features in a fast-paced, collaborative environment.',
	'Help shape the technical direction of the team while mentoring others and shipping high-quality code.'
];

function companyFromUrl (url: string): string {
	try {
		const hostname = new URL(url).hostname.replace(/^www\./, '');
		const segment = hostname.split('.')[0] ?? 'company';
		return segment.charAt(0).toUpperCase() + segment.slice(1);
	} catch {
		return 'Company';
	}
}

function datePostedFromId (id: number): string {
	const daysAgo = (id % 14) + 1;
	const date = new Date();
	date.setDate(date.getDate() - daysAgo);
	return date.toISOString().split('T')[0];
}

export function enrichJobListItem (item: JobListItem): Job {
	const index = Number(item.id) % LOCATIONS.length;
	const location = LOCATIONS[index];
	const employmentType = EMPLOYMENT_TYPES[Number(item.id) % EMPLOYMENT_TYPES.length];
	const salary = SALARIES[Number(item.id) % SALARIES.length];
	const experience = EXPERIENCES[Number(item.id) % EXPERIENCES.length];
	const description = DESCRIPTIONS[Number(item.id) % DESCRIPTIONS.length];
	const company = companyFromUrl(item.url);

	return {
		id: String(item.id),
		title: item.title,
		url: item.url,
		company,
		location,
		employmentType,
		salary,
		description: `${description} Role: ${item.title} at ${company}.`,
		remote: location === 'Remote',
		experience,
		datePosted: datePostedFromId(Number(item.id))
	};
}

export function enrichJobListItems (items: JobListItem[]): Job[] {
	return items.map(enrichJobListItem);
}
