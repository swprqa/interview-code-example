import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const NavLink = ({ text, icon, route }) => {
	const router = useRouter();

	return (
		<Link href={route} passHref>
			<ListItem button component="a" selected={router.pathname === route}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText>{text}</ListItemText>
			</ListItem>
		</Link>
	);
};
