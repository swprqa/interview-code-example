import React from 'react';
import Image from 'next/image';
import styled, { createGlobalStyle } from 'styled-components';
import { Card, Chip, Typography } from '@material-ui/core';

import { useTranslation } from '@utils/i18n';
import { theme } from '@src/theme';

const DEFAULT_IMAGE = '/playlist-placeholder.jpg';

const CardWrapper = styled(Card)`
	display: flex;
	flex-direction: column;
	align-items: start;
	padding: ${theme.spacing(2)}px;
`;

const CardTop = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
`;

const CardBottom = styled.div`
	margin-top: ${theme.spacing(1)}px;
`;

const ImageContainer = styled.div`
	min-height: 140px;
	min-width: 140px;
`;

const CourseData = styled.div`
	width: 100%;
	display: flex;

	& > div {
		display: flex;
		flex-direction: column;
		margin: auto;
	}
`;

const DescriptionContainer = styled.div`
	margin-top: ${theme.spacing(2)}px;
`;

const Description = styled(Typography)`
	height: calc(2 * ${theme.typography.body1.fontSize} * ${theme.typography.body1.lineHeight});
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Name = styled(Typography)`
	overflow: hidden;
	text-overflow: ellipsis;
	max-height: calc(2 * ${theme.typography.h5.fontSize} * ${theme.typography.h5.lineHeight});
	display: inline-block;
`;

const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-height: 65px;
	overflow: hidden;

	& > * {
		margin: ${theme.spacing(0.5)}px;
	}
`;

const GlobalStyle = createGlobalStyle`
	.round-image {
		border-radius: 50%;
	}
`;

export const PlaylistCard = ({ name, image = DEFAULT_IMAGE, description, tags }) => {
	const { t } = useTranslation('playlists');

	return (
		<CardWrapper>
			<CardTop>
				<GlobalStyle />
				<ImageContainer>
					<Image
						alt="Logo"
						src={image}
						width={140}
						height={140}
						layout="fixed"
						className="round-image"
					/>
				</ImageContainer>
				<CourseData>
					<div>
						<Typography variant="body2" color="textSecondary" gutterBottom>
							instrument-icon
						</Typography>
						<Typography variant="body2" color="textSecondary" gutterBottom>
							difficulty-icon
						</Typography>
						<Typography variant="body2" color="textSecondary" gutterBottom>
							author name
						</Typography>
					</div>
				</CourseData>
			</CardTop>
			<CardBottom>
				{/* TODO: make sure numeral lessonsCount i18ned */}
				<Name variant="h5" gutterBottom>
					{name}
				</Name>
				<DescriptionContainer>
					<Description color="textSecondary" variant="body1">
						{description}
					</Description>
				</DescriptionContainer>
				<Tags>
					{tags.map((tag) => (
						<Chip size="small" label={tag.name} key={tag.id} />
					))}
				</Tags>
			</CardBottom>
		</CardWrapper>
	);
};
