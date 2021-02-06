import YTSubtitles from "youtube-subtitles-downloader";
import getDictionary from "../utils/dictionary";
import ignoreWords from "../config/ignorewords.json";
import { getYtId } from "../utils";
const dictionary = getDictionary();

const filterWords = (subtitles) => {
	const words = {};
	subtitles.forEach((sub, i) => {
		sub.text.split(" ").forEach((w) => {
			const word = w
				.replace("'", "")
				.replace(".", "")
				.replace("[", "")
				.replace("]", "")
				.replace("-", "")
				.toLowerCase();
			if (!(word in ignoreWords) && dictionary.check(word) && word.length > 3) {
				words[word] = {
					start: sub.start,
					index: i,
				};
			}
		});
	});
	return words;
};

const convertToArray = (subtitles) => {
	let counter = 0;
	let arr = [];

	while (true) {
		let temp = String(counter);
		if (temp in subtitles) arr.push(subtitles[temp]);
		else break;
		counter++;
	}
	return arr;
};

export default async (url) => {
	const videoId = getYtId(url);
	console.log(videoId);
	const resp = await YTSubtitles.getLanguagesList(videoId, "en");
	if (!resp.length) return "Couldn't find subtitles for the video.";
	let subtitles = await resp.find((sub) => sub.languageCode === "en").fetch();
	subtitles = convertToArray(subtitles);
	const words = filterWords(subtitles);
	return { subtitles, words };
};
