export interface Company {
	id: number;
	name: string;
	listingUrl: string;
	singlePageUrlTemplate: string | null;
	enabled: boolean;
}

export interface CompanyCreateInput {
	name: string;
	listingUrl: string;
	singlePageUrlTemplate?: string | null;
	enabled: boolean;
}

export interface CompanyUpdateInput {
	name: string;
	listingUrl: string;
	singlePageUrlTemplate?: string | null;
	enabled: boolean;
}

export interface CompanyFormData {
	name: string;
	listingUrl: string;
	singlePageUrlTemplate: string;
	enabled: boolean;
}

export function emptyCompanyForm (): CompanyFormData {
	return {
		name: '',
		listingUrl: '',
		singlePageUrlTemplate: '',
		enabled: true
	};
}

export function companyToFormData (company: Company): CompanyFormData {
	return {
		name: company.name,
		listingUrl: company.listingUrl,
		singlePageUrlTemplate: company.singlePageUrlTemplate ?? '',
		enabled: company.enabled
	};
}

export function formDataToCreateInput (form: CompanyFormData): CompanyCreateInput {
	return {
		name: form.name.trim(),
		listingUrl: form.listingUrl.trim(),
		singlePageUrlTemplate: form.singlePageUrlTemplate.trim() || null,
		enabled: form.enabled
	};
}

export function formDataToUpdateInput (form: CompanyFormData): CompanyUpdateInput {
	return formDataToCreateInput(form);
}

export function validateCompanyForm (form: CompanyFormData): Record<string, string> {
	const errors: Record<string, string> = {};

	if (!form.name.trim()) {
		errors.name = 'Company name is required';
	}

	if (!form.listingUrl.trim()) {
		errors.listingUrl = 'Listing URL is required';
	}

	return errors;
}
