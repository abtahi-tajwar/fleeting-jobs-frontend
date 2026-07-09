import type { APIErrorResponse, APIListResponse, APIPostResponse } from './types';

export class ApiError extends Error {
	status: number;
	errors?: Record<string, string>;

	constructor (status: number, message: string, errors?: Record<string, string>) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.errors = errors;
	}
}

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

async function parseResponse<T> (response: Response): Promise<T> {
	const body = await response.json().catch(() => null);

	if (!response.ok) {
		const errorBody = body as APIErrorResponse | null;
		throw new ApiError(
			response.status,
			errorBody?.message ?? `Request failed with status ${response.status}`,
			errorBody?.errors
		);
	}

	return body as T;
}

export async function apiGetList<T> (path: string): Promise<T[]> {
	const response = await fetch(`${API_BASE_URL}${path}`);
	const body = await parseResponse<APIListResponse<T>>(response);

	if (!body.success) {
		throw new ApiError(response.status, 'Request was not successful');
	}

	return body.data;
}

export async function apiGet<T> (path: string): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`);
	const body = await parseResponse<APIPostResponse<T>>(response);

	if (!body.success) {
		throw new ApiError(response.status, 'Request was not successful');
	}

	return body.data;
}

export async function apiPost<T, B> (path: string, payload: B): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	const body = await parseResponse<APIPostResponse<T>>(response);

	if (!body.success) {
		throw new ApiError(response.status, 'Request was not successful');
	}

	return body.data;
}

export async function apiPut<T, B> (path: string, payload: B): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	const body = await parseResponse<APIPostResponse<T>>(response);

	if (!body.success) {
		throw new ApiError(response.status, 'Request was not successful');
	}

	return body.data;
}

export async function apiDelete (path: string): Promise<void> {
	const response = await fetch(`${API_BASE_URL}${path}`, { method: 'DELETE' });
	await parseResponse<APIPostResponse<null>>(response);
}

export function getErrorMessage (error: unknown): string {
	if (error instanceof ApiError) {
		return error.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return 'An unexpected error occurred';
}
