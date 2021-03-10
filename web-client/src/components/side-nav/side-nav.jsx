import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Image from 'next/image';
import { List, Hidden, Drawer, Divider } from '@material-ui/core';
import { NavLink } from '@components/side-nav/nav-link';

import { isServer } from '@utils/ssr';
import { useTranslation } from '@utils/i18n';
import { navigationSelector } from '@redux/navigation/selectors';
import { navigationSlice } from '@redux/navigation/slice';

export const SIDENAV_WIDTH = 240;
const drawerContainer = isServer ? undefined : () => window.document.body;

const Wrapper = styled.nav`
	width: ${SIDENAV_WIDTH};
	flex-shrink: 0;
`;

const DrawerWrapper = styled(Drawer)`
	width: ${SIDENAV_WIDTH}px;
	& > .MuiPaper-root {
		width: ${SIDENAV_WIDTH}px;
	}
`;

const LogoContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
`;

export const SideNav = ({ navLinks }) => {
	const { t } = useTranslation('common');
	const dispatch = useDispatch();
	const { isOpen } = useSelector(navigationSelector);

	return (
		<Wrapper>
			<Hidden smUp>
				<DrawerWrapper
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					variant="temporary"
					open={isOpen}
					container={drawerContainer}
					onClose={() => dispatch(navigationSlice.actions.close())}
				>
					<div>
						<LogoContainer>
							<Image alt={t('logoAlt')} src="/logo.png" width={130} height={130} />
						</LogoContainer>
						<Divider />
						<List>
							{navLinks.map(({ name, Icon, route }) => (
								<NavLink key={name} text={t(`routes.name`)} icon={<Icon />} route={route} />
							))}
						</List>
					</div>
				</DrawerWrapper>
			</Hidden>
		</Wrapper>
	);
};
