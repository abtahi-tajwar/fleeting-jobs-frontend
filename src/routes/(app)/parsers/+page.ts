import { listParserTemplates } from '$lib/api/parsers';
import { listCompanies } from '$lib/api/companies';
import { getErrorMessage } from '$lib/api/client';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async () => {
	try {
		const [parsers, companies] = await Promise.all([listParserTemplates(), listCompanies()]);
		return { parsers, companies, error: null as string | null };
	} catch (error) {
		return { parsers: [], companies: [], error: getErrorMessage(error) };
	}
};
