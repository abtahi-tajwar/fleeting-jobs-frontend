export interface APIListResponse<T> {
	success: boolean;
	data: T[];
}

export interface APIGetResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

export interface APIPostResponse<T> {
	success: boolean;
	data: T;
}

export interface APIErrorResponse {
	success: false;
	message: string;
	errors?: Record<string, string>;
}
