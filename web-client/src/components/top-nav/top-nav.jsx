import React, { useState } from 'react';
import { AppBar, Button, Container, Hidden, IconButton, Toolbar } from '@material-ui/core';
import {
	Favorite as FavoriteIcon,
	LibraryMusic as PlaylistsIcon,
	Menu as MenuIcon,
	People as CreatorsIcon,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { useTranslation } from '@utils/i18n';
import { LoginDialog } from '@components/login-dialog';
import { navigationSlice } from '@redux/navigation/slice';

const ToolbarWrapper = styled(Toolbar)`
	display: flex;
	justify-content: space-between;
`;

const EmptySpace = styled.div`
	flex-grow: 1;
`;

const Navigation = styled.div`
	display: flex;
`;

const menuItems = [
	{ name: 'playlists', Icon: PlaylistsIcon, route: '/playlists' },
	{ name: 'favorites', Icon: FavoriteIcon, route: '/favorites' },
	{ name: 'users', Icon: CreatorsIcon, route: '/users' },
];

export const TopNav = () => {
	const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation('common');

	return (
		<AppBar position="fixed">
			<Container>
				<ToolbarWrapper>
					<Hidden smUp>
						<IconButton
							aria-label={t('topnav.toggleButtonLabel')}
							onClick={() => dispatch(navigationSlice.actions.toggle())}
						>
							<MenuIcon />
						</IconButton>
					</Hidden>
					<Hidden xsDown>
						<Navigation>
							{menuItems.map(({ name, route }) => (
								<Button color="inherit" key={name} href={route}>
									{t(`routes.${name}`)}
								</Button>
							))}
						</Navigation>
					</Hidden>
					<EmptySpace />
					<Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
						{t('topnav.login')}
					</Button>
					<Button color="inherit">{t('topnav.signup')}</Button>
					<LoginDialog isOpen={isLoginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
				</ToolbarWrapper>
			</Container>
		</AppBar>
	);
};
