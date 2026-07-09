import { listCompanies } from '$lib/api/companies';
import { getErrorMessage } from '$lib/api/client';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async () => {
	try {
		const companies = await listCompanies();
		return { companies, error: null as string | null };
	} catch (error) {
		return { companies: [], error: getErrorMessage(error) };
	}
};
