import { serialize, parse } from 'cookie';

export const createCookie = (res, name, value, options) => {
	const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

	return serialize(name, String(stringValue), options);
};

export const getTokensFromCookies = (cookie = '') => {
	const { accessToken = '', refreshToken = '' } = parse(cookie);
	return { accessToken, refreshToken };
};
