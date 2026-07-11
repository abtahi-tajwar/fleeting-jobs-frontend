import { apiGetData } from './client';
import { enrichJobListItems } from '$lib/types/job';
import type { JobListItem } from '$lib/types/job';
import type { Job } from '$lib/types';

const BASE_PATH = '/jobs';

export function listJobs (): Promise<Job[]> {
	return apiGetData<JobListItem[]>(`${BASE_PATH}/list`).then(enrichJobListItems);
}
