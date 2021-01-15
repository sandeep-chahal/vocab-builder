import fetch from "node-fetch";

export default async (req, res) => {
	const showId = req.query.id;
	let result = await (
		await fetch(
			`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.THEMOVIEDB_API}&language=en-US`
		)
	).json();
	const seasons = result.seasons.map((s) => s.episode_count);
	res.json({
		seasons,
	});
};
