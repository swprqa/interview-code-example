import { createCookie } from '@utils/cookies';

export default async (req, res) => {
	const cookieOptions = {
		httpOnly: true,
		sameSite: 'strict',
		// secure: true,
		maxAge: 9999,
		path: '/',
	};

	res.setHeader('Set-Cookie', [
		createCookie(res, 'refreshToken', req.body.tokens.refreshToken, cookieOptions),
		createCookie(res, 'accessToken', req.body.tokens.accessToken, cookieOptions),
	]);

	res.statusCode = 200;
	res.end();
};
