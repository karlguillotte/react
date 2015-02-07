const TYPE = 'trail';

export default function(trail) {
	var coordinates = [];

	if (trail.track && trail.track.latitude && trail.track.longitude) {
		var track = trail.track;
		var latitudes = track.latitude.split(',').map(parseFloat);
		var longitudes = track.longitude.split(',').map(parseFloat);
		
		coordinates = longitudes.map((longitude, index) => {
			return [latitudes[index], longitude];
		});
	}

	return {
		id: String(trail.trailid),
		type: TYPE,
		title: trail.title,
		description: trail.description,
		coordinates: coordinates
	}
};