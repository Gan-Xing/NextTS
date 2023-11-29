// services/myfetch.ts
async function myfetch(
	url: string,
	options: {
		method: string;
		data?: any;
		params?: any;
		headers?: Record<string, string>;
		signal?: AbortSignal;
		[key: string]: any;
	}
): Promise<any> {
	const { method, data, params, headers = {}, signal, ...restOptions } = options;

	let query = '';
	if (params) {
		query = Object.keys(params)
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(
						params[key]
					)}`
			)
			.join('&');
	}

	try {
		const response = await fetch(`${url}${query ? `?${query}` : ''}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				...headers
			},
			body: data && method !== 'GET' ? JSON.stringify(data) : null,
			signal,
			...restOptions
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error: any) {
		if (error.name === 'AbortError') {
			console.error('Fetch request was cancelled:', error);
		} else {
			console.error('Fetch error:', error);
		}
		throw error;
	}
}

export default myfetch;
