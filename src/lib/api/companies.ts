import { apiDelete, apiGet, apiGetList, apiPost, apiPut } from './client';
import type { Company, CompanyCreateInput, CompanyUpdateInput } from '$lib/types/company';

const BASE_PATH = '/companies';

export function listCompanies (): Promise<Company[]> {
	return apiGetList<Company>(`${BASE_PATH}/list`);
}

export function getCompany (id: number): Promise<Company> {
	return apiGet<Company>(`${BASE_PATH}/get/${id}`);
}

export function createCompany (input: CompanyCreateInput): Promise<Company> {
	return apiPost<Company, CompanyCreateInput>(`${BASE_PATH}/create`, input);
}

export function updateCompany (id: number, input: CompanyUpdateInput): Promise<Company> {
	return apiPut<Company, CompanyUpdateInput>(`${BASE_PATH}/update/${id}`, input);
}

export function deleteCompany (id: number): Promise<void> {
	return apiDelete(`${BASE_PATH}/delete/${id}`);
}

export function toggleCompanyEnabled (company: Company): Promise<Company> {
	return updateCompany(company.id, {
		name: company.name,
		listingUrl: company.listingUrl,
		singlePageUrlTemplate: company.singlePageUrlTemplate,
		enabled: !company.enabled
	});
}
