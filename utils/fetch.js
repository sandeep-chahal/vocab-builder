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

export const getCustomData = async (text) => {
	try {
		const req = await fetch("/api/custom", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});
		const data = await req.json();
		return data.words;
	} catch (err) {
		return null;
	}
};

export const uploadImage = async (file) => {
	try {
		const form = new FormData();
		form.append("img", file);

		const req = await fetch("/api/image", {
			method: "POST",
			// headers: {
			// 	"Content-Type": "multipart/form-data",
			// },
			body: form,
		});
		const data = await req.json();
		return data;
	} catch (err) {
		return {
			error: true,
			msg: "Something went wrong!",
		};
	}
};
