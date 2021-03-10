import React from 'react';
import MaterialDialog from '@material-ui/core/Dialog';

import { getAllChildrenExcept, getChildrenOfType } from '@utils/components';
import { DialogTitle } from '.';

export const Dialog = ({ id, isOpen = false, onClose = () => {}, children }) => {
	const [firstTitle] = getChildrenOfType(DialogTitle, children);
	const restChildren = getAllChildrenExcept(firstTitle, children);

	return (
		<MaterialDialog open={isOpen} onClose={onClose} aria-describedby={id}>
			{React.cloneElement(firstTitle, { id })}
			{restChildren}
		</MaterialDialog>
	);
};
