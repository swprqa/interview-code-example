import React from 'react';
import { Grid } from '@material-ui/core';

import { PlaylistCard } from '@components/playlist-card';

export const PlaylistGrid = ({ playlists }) => {
	return (
		<Grid container spacing={3}>
			{playlists.map((playlist) => (
				<Grid item lg={4} md={6} xs={12} key={playlist.id}>
					{/* TODO: set isFavorite */}
					<PlaylistCard {...playlist} isFavorite={Boolean(Math.round(Math.random()))} />
				</Grid>
			))}
		</Grid>
	);
};
