import NextI18Next from 'next-i18next';
import config from 'next/config';
import path from 'path';

const { localeSubpaths } = config().publicRuntimeConfig;

export const { appWithTranslation, i18n, useTranslation, withTranslation } = new NextI18Next({
	otherLanguages: ['ru'],
	localeSubpaths,
	localePath: path.resolve('./public/static/locales'),
	defaultLanguage: 'en',
});
