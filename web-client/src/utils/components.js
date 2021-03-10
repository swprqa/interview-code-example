import { Children } from 'react';

export const getChildrenOfType = (componentType, children) =>
	Children.map(children, (el) => {
		if (el && el.type === componentType) {
			return el;
		}
	});

export const getAllChildrenExcept = (child, children) =>
	Children.toArray(children).filter((el) => el.key !== child.key);
