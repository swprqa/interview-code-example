import React from 'react';
import Head from 'next/head';
import { Typography } from '@material-ui/core';

import { useTranslation } from '@utils/i18n';

const Users = () => {
	const { t } = useTranslation('users');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
			</Head>

			<main>
				<Typography variant="h2">{t('h1')}</Typography>
			</main>
		</>
	);
};

export default Users;
