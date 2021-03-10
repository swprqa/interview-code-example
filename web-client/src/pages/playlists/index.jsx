import React, { useEffect } from 'react';
import Head from 'next/head';
import { Divider, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Add as AddIcon } from '@material-ui/icons';

import { PlaylistGrid } from '@components/playlist-grid';
import { PlaylistsFilter } from '@components/playlists-filter';
import { useTranslation } from '@utils/i18n';
import { theme } from '@src/theme';

import { loadPlaylists } from '@redux/playlists/actions';
import { playlistsSelector } from '@redux/playlists/selectors';
import { tagsSelector } from '@redux/tags/selectors';
import { loadTags } from '@redux/tags/actions';

const DividerWrapper = styled(Divider)`
	margin-left: ${theme.spacing(2)}px !important;
	margin-right: ${theme.spacing(2)}px !important;
`;

const GridWrapper = styled(PlaylistGrid)`
	margin-top: ${theme.spacing(2)}px !important;
`;

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: ${theme.spacing(2)}px;
	margin-bottom: ${theme.spacing(2)}px;
`;

const Playlists = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation('playlists');

	const playlists = useSelector(playlistsSelector);
	const tagTypes = useSelector(tagsSelector);

	useEffect(() => {
		dispatch(loadPlaylists());
		dispatch(loadTags());
	}, [dispatch]);

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<description>{t('description')}</description>
			</Head>

			<main>
				<HeaderContainer>
					<Typography variant="h2" display="inline">
						{t('h1')}
					</Typography>
					<DividerWrapper orientation="vertical" flexItem />
					<Button color="primary" variant="contained" startIcon={<AddIcon />}>
						{t('create')}
					</Button>
				</HeaderContainer>
				<PlaylistsFilter tagTypes={tagTypes} />
				<GridWrapper playlists={playlists} />
			</main>
		</>
	);
};

export default Playlists;
