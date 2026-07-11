import { listJobs } from '$lib/api/jobs';
import { getErrorMessage } from '$lib/api/client';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async () => {
	try {
		const jobs = await listJobs();
		return { jobs, error: null as string | null };
	} catch (error) {
		return { jobs: [], error: getErrorMessage(error) };
	}
};
