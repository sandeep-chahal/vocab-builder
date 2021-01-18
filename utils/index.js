export const getYtId = (url) => {
	try {
		if (url.includes("watch?v=")) return url.split("watch?v=")[1].split("&")[0];
		else return url.split(".be/")[1].split("&")[0];
	} catch (err) {
		console.log(err);
		return "";
	}
};
