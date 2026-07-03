export type ApplicationStatus =
	| 'Applied'
	| 'Screening'
	| 'Interview'
	| 'Assessment'
	| 'Offer'
	| 'Rejected'
	| 'Withdrawn';

export type ParserStatus = 'active' | 'inactive' | 'error' | 'pending';

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';

export interface Job {
	id: string;
	company: string;
	title: string;
	location: string;
	employmentType: EmploymentType;
	salary: string;
	description: string;
	remote: boolean;
	experience: string;
	datePosted: string;
	saved?: boolean;
}

export interface Application {
	id: string;
	company: string;
	position: string;
	appliedDate: string;
	status: ApplicationStatus;
	interviewDate?: string;
	notes: string;
}

export interface Parser {
	id: string;
	company: string;
	parserName: string;
	status: ParserStatus;
	lastUpdated: string;
	jobsFound: number;
}

export interface DashboardStats {
	totalJobs: number;
	applicationsSent: number;
	resumesGenerated: number;
	coverLettersGenerated: number;
	trackedCompanies: number;
	activeParsers: number;
}

export interface ResumeTemplate {
	id: string;
	name: string;
	description: string;
}

export interface NavItem {
	id: string;
	label: string;
	href: string;
	icon: string;
}

export interface JobFilters {
	query: string;
	company: string;
	location: string;
	remote: boolean;
	employmentType: string;
	experience: string;
	salary: string;
	datePosted: string;
}

export type CoverLetterTone = 'Professional' | 'Friendly' | 'Enthusiastic' | 'Formal';
export type CoverLetterLength = 'Short' | 'Medium' | 'Long';
