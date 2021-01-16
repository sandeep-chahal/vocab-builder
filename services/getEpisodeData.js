import OS from "opensubtitles-api";
import ignoreWords from "../config/ignorewords.json";
import getDictionary from "../utils/dictionary";
const dictionary = getDictionary();

const OpenSubtitles = new OS({
	useragent: process.env.USERAGENT,
});

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

const getSubtitles = async (name, season, episode) => {
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
		return text;
	} catch (err) {
		console.log("-".repeat(25), "getting subtitles", "-".repeat(25));
		console.log(err.message);
		return null;
	}
};

export default async (name, season, episode) => {
	try {
		const text = await getSubtitles(name, season, episode);
		if (text === null) return null;
		let subtitle = filterSubtitles(text);
		let words = getWords(subtitle);
		return { subtitle, words };
	} catch (err) {
		console.log("-".repeat(25), "getEpisodeData", "-".repeat(25));
		console.log(err.message);
		return null;
	}
};
