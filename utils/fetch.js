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

export const imageToText = async (img) => {
	try {
		const form = new FormData();
		form.append("file", img);
		form.append("apikey", process.env.NEXT_PUBLIC_APIKEY);
		form.append("language", "eng");

		const req = await fetch("https://api.ocr.space/parse/image", {
			method: "POST",
			body: form,
		});
		const res = await req.json();
		return res.ParsedResults[0].ParsedText;
	} catch (err) {
		console.log(err);
		return null;
	}
};
