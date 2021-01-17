import getDictionary from "../utils/dictionary";
import ignoreWords from "../config/ignorewords.json";

const dictionary = getDictionary();

export default (text) => {
	let words = {};
	text
		.split(" ")
		.map((word) => word.replace(".", "").replace(",", "").toLowerCase())
		.filter(
			(word) =>
				!(word in ignoreWords) && dictionary.check(word) && word.length > 3
		)
		.forEach((word) => (words[word] = true));

	return words;
};
