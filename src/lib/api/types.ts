export interface APIListResponse<T> {
	success: boolean;
	data: T[];
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
