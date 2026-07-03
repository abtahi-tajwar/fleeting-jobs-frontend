import type { ResumeTemplate } from '$lib/types';

export const resumeTemplates: ResumeTemplate[] = [
	{
		id: 'template-1',
		name: 'Modern Professional',
		description: 'Clean layout with emphasis on experience and skills'
	},
	{
		id: 'template-2',
		name: 'Technical Focus',
		description: 'Highlights projects, tech stack, and open source contributions'
	},
	{
		id: 'template-3',
		name: 'Executive Summary',
		description: 'Leadership-oriented format for senior roles'
	},
	{
		id: 'template-4',
		name: 'Minimal ATS-Friendly',
		description: 'Simple structure optimized for applicant tracking systems'
	}
];

export const resumePreviewPlaceholder = `JANE DOE
Software Engineer | San Francisco, CA | jane.doe@email.com

SUMMARY
Results-driven software engineer with 8+ years building scalable web applications.
Experienced in full-stack development, cloud infrastructure, and team leadership.

EXPERIENCE
Senior Software Engineer — TechCorp (2022 – Present)
• Led migration of monolith to microservices, reducing deployment time by 60%
• Mentored team of 5 engineers on best practices and code review standards
• Built real-time analytics dashboard serving 2M+ daily active users

Software Engineer — StartupXYZ (2018 – 2022)
• Developed REST APIs and React frontends for B2B SaaS platform
• Implemented CI/CD pipelines reducing release cycles from weeks to days

SKILLS
TypeScript, Python, React, Node.js, AWS, Kubernetes, PostgreSQL, Redis

EDUCATION
B.S. Computer Science — University of California, Berkeley`;

export const jobDescriptionPreviewPlaceholder = `We are looking for a Senior Software Engineer to join our growing team.
You will design and build scalable systems, mentor junior engineers, and
collaborate with product and design teams to deliver exceptional user experiences.

Requirements:
• 5+ years of software development experience
• Strong proficiency in TypeScript and modern web frameworks
• Experience with cloud infrastructure (AWS/GCP)
• Excellent communication and collaboration skills`;
