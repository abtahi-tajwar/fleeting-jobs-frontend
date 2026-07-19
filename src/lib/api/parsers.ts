import { apiDelete, apiGet, apiGetList, apiPost, apiPut } from './client';
import type {
	ParserTemplate,
	ParserTemplateCreateInput,
	ParserTemplateFilters,
	ParserTemplateUpdateInput
} from '$lib/types/parser';

const BASE_PATH = '/parser';

export function listParserTemplates (filters: ParserTemplateFilters = {}): Promise<ParserTemplate[]> {
	const params = new URLSearchParams();

	if (filters.companyId != null) {
		params.set('companyId', String(filters.companyId));
	}

	if (filters.companyName && filters.companyName.trim()) {
		params.set('companyName', filters.companyName.trim());
	}

	const query = params.toString();
	return apiGetList<ParserTemplate>(`${BASE_PATH}/list${query ? `?${query}` : ''}`);
}

export function getParserTemplate (id: number): Promise<ParserTemplate> {
	return apiGet<ParserTemplate>(`${BASE_PATH}/get/${id}`);
}

export function createParserTemplate (input: ParserTemplateCreateInput): Promise<ParserTemplate> {
	return apiPost<ParserTemplate, ParserTemplateCreateInput>(`${BASE_PATH}/create`, input);
}

export function updateParserTemplate (
	id: number,
	input: ParserTemplateUpdateInput
): Promise<ParserTemplate> {
	return apiPut<ParserTemplate, ParserTemplateUpdateInput>(`${BASE_PATH}/update/${id}`, input);
}

export function deleteParserTemplate (id: number): Promise<void> {
	return apiDelete(`${BASE_PATH}/delete/${id}`);
}
