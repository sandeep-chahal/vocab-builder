import Compress from "compress.js";
const compress = new Compress();

export const getYtId = (url) => {
	try {
		if (url.includes("watch?v=")) return url.split("watch?v=")[1].split("&")[0];
		else return url.split(".be/")[1].split("&")[0];
	} catch (err) {
		console.log(err);
		return "";
	}
};

export const reduceImageSize = async (file) => {
	console.log("original file:", file);
	if (file.size / 1024 / 1024 < 1024) return file;
	console.log("compressing");
	const data = await compress.compress([file], {
		size: 1,
	});
	console.log(data);
	return dataURLtoFile(data[0].prefix + data[0].data, file.name);
};

function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	console.log(new File([u8arr], filename, { type: mime }));
	return new File([u8arr], filename, { type: mime });
}
