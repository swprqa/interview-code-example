import * as yup from 'yup';

const ConfigSchema = yup.object().shape({
	graph: yup
		.object()
		.shape({
			hostname: yup.string().required(),
			port: yup.number().required(),
			url: yup.string().required(),
		})
		.required(),
});

const config = {
	graph: {
		hostname: process.env.GRAPH_HOSTNAME || process.env.NEXT_PUBLIC_GRAPH_HOSTNAME || '',
		port: parseInt(process.env.NEXT_PUBLIC_GRAPH_PORT || '', 10),
		url: `http://${process.env.NEXT_PUBLIC_GRAPH_HOSTNAME}:${process.env.NEXT_PUBLIC_GRAPH_PORT}/graphql`,
	},
};

ConfigSchema.validateSync(config);

export { config };
