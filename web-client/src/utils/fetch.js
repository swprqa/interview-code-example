import { config } from '@src/config';

let middlewares = [];

export const addFetchMiddleware = (middleware) => {
	middlewares.push(middleware);
	return middleware;
};

export const removeFetchMiddleware = (middleware) => {
	middlewares = middlewares.filter((m) => m !== middleware);
};

export const clearFetchMiddleware = () => (middlewares = []);

export const apiRequest = async (body) => {
	const initialOptions = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};

	const options = middlewares.reduce((acc, cur) => cur(acc), initialOptions);

	const response = await fetch(config.graph.url, options);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = (await response.json()).data;

	if (data.error) {
		throw new Error(data.errorMessage);
	}

	// TODO: return data.data after server fix
	return data[Object.keys(data)[0]];
};
