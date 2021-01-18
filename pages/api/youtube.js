import getYoutubeData from "../../services/getYoutubeData";

export default async (req, res) => {
	try {
		const result = await getYoutubeData(req.query.url);
		if (typeof result === "string")
			return res.json({
				error: true,
				msg: result,
			});
		res.json({
			error: false,
			...result,
		});
	} catch (err) {
		console.log(err);
		res.json({
			error: true,
			msg: "Something Went Wrong!",
		});
	}
};
