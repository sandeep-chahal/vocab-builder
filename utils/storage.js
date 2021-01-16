const get = (q) => {
	try {
		const items = JSON.parse(localStorage.getItem(q));
		return items;
	} catch (err) {
		return null;
	}
};
const set = (q, item, limit) => {
	try {
		const items = get(q) || [];
		if (items.length >= limit) {
			items.pop();
		}
		items.unshift(item);
		localStorage.setItem(q, JSON.stringify(items));
	} catch (err) {
		return null;
	}
};

export default { set, get };
