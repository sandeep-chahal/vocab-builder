export const getShowInfo = async (id) => {
	try {
		const req = await fetch(`/api/getShowInfo?id=${id}`);
		const res = await req.json();
		return res.seasons;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const searchShows = async (query) => {
	try {
		const req = await fetch("/api/search?query=" + query);
		const res = await req.json();
		return res.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};
