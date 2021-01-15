import OS from "opensubtitles-api";
import Typo from "typo-js";
import ignoreWords from "../config/ignorewords.json";
import path from "path";
console.log(path.resolve("..", "config"));
const dictionary = new Typo("en_US", false, false, {
	dictionaryPath: "config",
});

const OpenSubtitles = new OS(process.env.USERAGENT);
OpenSubtitles.login(
	process.env.USERNAME,
	process.env.PASSWORD,
	"en",
	process.env.USERAGENT
);
const filterSubtitles = (text) => {
	return text
		.split("\n")
		.filter((line) => {
			if (line.startsWith("0") && line.includes("-->")) return false;
			if (line === "\r") return false;
			if (!isNaN(Number(line))) return false;
			if (line.includes(".com")) return false;
			if (line.includes("OpenSubtitles")) return false;
			if (line.includes("USD/month")) return false;
			if (line.includes("Support us and become VIP member")) return false;
			return true;
		})
		.map((line) => {
			const newLine = line.replace(/<\/?[^>]+(>|$)/g, "").replace("\r", "");
			return newLine
				.split(" ")
				.map((word) => word.replace(/[\?\!\"\-\.\,\']/g, "").trim())
				.join(" ");
		});
};

const getWords = (subtitles) => {
	let words = {};
	subtitles.map((line) => {
		line.split(" ").map((w) => {
			const word = w.toLowerCase();
			if (!ignoreWords[word] && dictionary.check(word) && word.length > 3) {
				words[word] = true;
			}
		});
	});
	return words;
};

export default async (name, season, episode) => {
	try {
		await OpenSubtitles.login(
			process.env.USERNAME,
			process.env.PASSWORD,
			"en",
			process.env.USERAGENT
		);
		const res = await OpenSubtitles.search({
			season,
			episode,
			limit: 1,
			sublanguageid: "eng",
			query: name,
		});
		const rawSub = await fetch(res.en[0].url);
		const text = await rawSub.text();
		let subtitle = filterSubtitles(text);
		let words = getWords(subtitle);
		return { subtitle, words };
	} catch (err) {
		console.log(err);
		return null;
	}
};
