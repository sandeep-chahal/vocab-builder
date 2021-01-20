import Tesseract from "tesseract.js";
import multer from "multer";
import getCustomWords from "../../services/getCustomData";

export const config = {
	api: {
		bodyParser: false,
	},
};

var storage = multer.memoryStorage({});

var upload = multer({
	storage: storage,
}).single("img");

export default async (req, res) => {
	try {
		upload(req, {}, (err) => {
			// if error
			if (err || !req.file) {
				console.log(err);
				let msg = "Something went wrong!";
				if (err.code === "LIMIT_UNEXPECTED_FILE");
				msg = "Please upload a valid image file and try again!";
				return res.json({
					error: true,
					msg,
				});
			}
			// if file is not an image
			if (!req.file.mimetype.includes("image/")) {
				return res.json({
					error: true,
					msg: "Please upload image only",
				});
			}
			Tesseract.recognize(req.file.buffer, "eng", {
				logger: (m) => console.log(m),
			})
				.then(async ({ data: { text } }) => {
					console.log(text);
					const words = getCustomWords(text);
					res.json({
						error: false,
						words,
						text,
					});
				})
				.catch((err) => {
					console.log(err);
					res.json({
						error: true,
						msg: "Something went wrong!",
					});
				});
		});
	} catch (err) {
		console.log(err);
		res.json({
			error: true,
			msg: "Something went wrong!",
		});
	}
};
