import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import {
	LibraryMusic as PlaylistsIcon,
	Favorite as FavoriteIcon,
	People as CreatorsIcon,
} from '@material-ui/icons';

import { SideNav } from '@components/side-nav';
import { TopNav } from '@components/top-nav';
import { theme } from '@src/theme';

const Wrapper = styled.div`
	display: flex;
`;

const MainContentMargin = styled.div(theme.mixins.toolbar);

const navLinks = [
	{ name: 'playlists', Icon: PlaylistsIcon, route: '/playlists' },
	{ name: 'favorites', Icon: FavoriteIcon, route: '/favorites' },
	{ name: 'users', Icon: CreatorsIcon, route: '/users' },
];

export const Layout = ({ children }) => {
	return (
		<Wrapper>
			<SideNav navLinks={navLinks} />
			<TopNav navLinks={navLinks} />
			<Container>
				<MainContentMargin />
				{children}
			</Container>
		</Wrapper>
	);
};
