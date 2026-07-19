export type ParserTemplateConfig = Record<string, unknown>;

export interface ParserTemplate {
	id: number;
	companyId: number | null;
	companyName: string | null;
	config: ParserTemplateConfig;
}

export interface ParserTemplateCreateInput {
	companyId: number;
	config: ParserTemplateConfig;
}

export interface ParserTemplateUpdateInput {
	companyId?: number | null;
	config: ParserTemplateConfig;
}

export interface ParserTemplateFilters {
	companyId?: number | null;
	companyName?: string;
}

export interface ParserFormData {
	companyId: number | null;
	configText: string;
}

/**
 * Skeleton config used when creating a brand new parser template. The keys are
 * snake_case to match the backend `ParserTemplateType` JSON serialization.
 */
export const defaultParserConfig: ParserTemplateConfig = {
	company: '',
	version: 1,
	start_url: '',
	posting_count: { selector: '' },
	listing: {
		container: '',
		fields: {
			title: { type: 'text', selector: '' },
			url: { type: 'attribute', selector: 'a', attribute: 'href', absolute: true }
		}
	},
	job_details: { description: '' },
	pagination: {
		type: 'url_parameter',
		parameter: 'page',
		start: 1,
		increment: 1,
		page_size: 20,
		additional_parameters: {}
	}
};

export function stringifyConfig (config: ParserTemplateConfig): string {
	return JSON.stringify(config ?? {}, null, 2);
}

export function emptyParserForm (): ParserFormData {
	return {
		companyId: null,
		configText: stringifyConfig(defaultParserConfig)
	};
}

export function parserToFormData (parser: ParserTemplate): ParserFormData {
	return {
		companyId: parser.companyId,
		configText: stringifyConfig(parser.config)
	};
}

export interface ParsedConfigResult {
	config?: ParserTemplateConfig;
	error?: string;
}

export function parseConfigText (text: string): ParsedConfigResult {
	if (!text.trim()) {
		return { error: 'Parser config is required' };
	}

	try {
		const parsed = JSON.parse(text);
		if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
			return { error: 'Config must be a JSON object' };
		}
		return { config: parsed as ParserTemplateConfig };
	} catch {
		return { error: 'Config is not valid JSON' };
	}
}
