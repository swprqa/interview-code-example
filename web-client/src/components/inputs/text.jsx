import { TextField } from '@material-ui/core';
import React, { forwardRef } from 'react';

export const TextInput = ({ id, label, helperText, defaultValue, name }, ref) => {
	return (
		<TextField
			id={id}
			label={label}
			defaultValue={defaultValue}
			helperText={helperText}
			inputRef={ref}
			name={name}
		/>
	);
};

export default forwardRef(TextInput);
