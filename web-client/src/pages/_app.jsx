import React, { useEffect } from 'react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { Layout } from '@components/layout/layout';
import { appWithTranslation } from '@utils/i18n';
import { wrapper } from '@redux/store';
import { theme } from '@src/theme';

// https://material-ui.com/guides/server-rendering/

const WrappedApp = ({ Component, pageProps }) => {
	useEffect(() => {
		// TODO: auth
	}, []);

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</>
	);
};

export default wrapper.withRedux(appWithTranslation(WrappedApp));
