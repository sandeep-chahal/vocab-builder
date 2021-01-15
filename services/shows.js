export const getTrendingShows = async () => {
	const req = await fetch(
		`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.THEMOVIEDB_API}&language=en-US&page=1`
	);
	const res = await req.json();
	return res.results.filter((item) => item["origin_country"].includes("US"));
};
