const TYPE = 'region';

export default function(region) {
	var coordinates = region.bounding_polygon.split(' ').map(c => {
		c = c.split(',').map(parseFloat);

		if (c[0] && c[1]) {
			return [c[1], c[0]];
		}

	}).filter(c => !!c);

	coordinates.push(coordinates[0]);

	return {
		id: String(region.rid),
		type: TYPE,
		alias: region.alias,
		title: region.title,
		description: region.description,
		coordinates: [coordinates]
	}
};