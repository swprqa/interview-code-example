import React from 'react';
import MaterialDialogTitle from '@material-ui/core/DialogTitle';

export const DialogTitle = ({ children, id }) => {
	return <MaterialDialogTitle id={id}>{children}</MaterialDialogTitle>;
};
