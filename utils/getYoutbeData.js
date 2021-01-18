export default async (url) => {
	try {
		const req = await fetch("/api/youtube?url=" + url);
		const res = await req.json();
		return res;
	} catch (err) {
		console.log(err);
		return {
			error: true,
			msg: "Something Went Wrong",
		};
	}
};
