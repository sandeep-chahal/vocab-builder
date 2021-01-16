import Typo from "typo-js";
import fs from "fs";
import path from "path";
let dictionary = null;

export default () => {
	if (dictionary) return dictionary;
	try {
		const affData = fs.readFileSync(
			path.resolve("config", "en_US", "en_US.aff")
		);
		const wordData = fs.readFileSync(
			path.resolve("config", "en_US", "en_US.dic")
		);
		dictionary = new Typo("en_US", affData.toString(), wordData.toString());
		console.log("dictionary created");
		return dictionary;
	} catch (err) {
		console.log("-".repeat(25), "dictionary error", "-".repeat(25));
		console.log(err.message);
		return null;
	}
};
