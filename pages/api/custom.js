import getCustomWords from "../../services/getCustomData";

export default async (req, res) => {
	try {
		if (req.method != "POST") return res.send("not supported");
		const words = getCustomWords(req.body.text);
		res.json({
			error: false,
			words,
		});
	} catch (err) {
		console.log(err);
		res.json({
			error: true,
		});
	}
};
