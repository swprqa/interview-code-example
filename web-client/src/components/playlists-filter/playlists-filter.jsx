import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { theme } from '@src/theme';
import { useTranslation } from '@utils/i18n';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const FilterBox = styled.div`
	justify-self: flex-start;
`;

const OrderBox = styled.div`
	align-self: flex-end;
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
`;

const FormControlWrapper = styled(FormControl)`
	min-width: 150px !important;
	margin-top: ${theme.spacing(1)}px !important;
	margin-right: ${theme.spacing(1)}px !important;
`;

export const PlaylistsFilter = ({ tagTypes }) => {
	const { t } = useTranslation('playlists');

	return (
		<Wrapper>
			<FilterBox>
				{tagTypes.map((type) => (
					<FormControlWrapper variant="outlined" key={type.id}>
						<InputLabel id={`${type.name}-label`}>{t(`filter.tagTypes.${type.name}`)}</InputLabel>
						<Select labelId={`${type.name}-label`} defaultValue="">
							{type.tags.map((tag) => (
								<MenuItem key={tag.id} value={tag.id}>
									{t(`filter.tags.${tag.name}`)}
								</MenuItem>
							))}
						</Select>
					</FormControlWrapper>
				))}
			</FilterBox>
			<OrderBox>
				<FormControlWrapper variant="outlined">
					<InputLabel id="order-by-label">{t('filter.orderByLabel')}</InputLabel>
					<Select labelId="order-by-label" defaultValue="date">
						<MenuItem value="date">{t('filter.orderByOptions.date')}</MenuItem>
					</Select>
				</FormControlWrapper>
			</OrderBox>
		</Wrapper>
	);
};
