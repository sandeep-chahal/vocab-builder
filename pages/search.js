import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/search.module.css";
import Show from "../components/show";
import { searchShows } from "../utils/fetch";
import Storage from "../utils/storage";

const Search = () => {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [searchedItems, setSearchedItems] = useState(null);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		setHistory(Array.from(new Set(Storage.get("search-history"))));
	}, []);

	const handleSearch = async (e) => {
		e.preventDefault();
		if (query.trim().length < 3) return;
		Storage.set("search-history", query, 5);
		const shows = await searchShows(query);
		setSearchedItems(shows);
		setHistory((h) => {
			h.unshift(query);
			return h;
		});
	};

	return (
		<div className={styles.searchWrapper}>
			<Head>
				<title>Search</title>
			</Head>
			<form className={styles.inputWrapper} onSubmit={handleSearch}>
				<input
					placeholder="type a tv show name"
					list="search-history"
					spellCheck={true}
					className={styles.input}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<datalist id="search-history">
					{history && history.map((h) => <option key={h} value={h} />)}
				</datalist>
			</form>
			<div className={styles.searchList}>
				{searchedItems && searchedItems.length
					? searchedItems.map((item) => <Show key={item.id} show={item} />)
					: null}

				{searchedItems && !searchedItems.length ? (
					<div className={styles.meta}>not found!</div>
				) : null}
				{searchedItems ? null : (
					<div className={styles.meta}>Search Any Tv Show!</div>
				)}
			</div>
		</div>
	);
};

export default Search;
