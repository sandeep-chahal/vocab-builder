export default async (req, res) => {
	try {
		const query = req.query.query || "";

		const reqq = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${process.env.THEMOVIEDB_API}&language=en-US&query=${query}&page=1&include_adult=true`
		);
		const ress = await reqq.json();
		console.log(ress);
		res.json({
			data: ress.results.filter(
				(item) => item.media_type === "tv" && item.original_language === "en"
			),
		});
	} catch (err) {
		console.log("ERROR IN /API/SEARCH/", query);
		console.log(err);
		res.json({
			data: [],
		});
	}
};
