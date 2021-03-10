import React from 'react';
import { Button as MaterialButton } from '@material-ui/core';

export const Button = ({ onClick = () => {}, color = 'primary', children }) => (
	<MaterialButton onClick={onClick} color={color}>
		{children}
	</MaterialButton>
);
