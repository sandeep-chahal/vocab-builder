import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/search.module.css";
import Show from "../components/show";
import { searchShows } from "../utils/fetch";
import Storage from "../utils/storage";

const Search = () => {
	const input = useRef(null);
	const [loading, setLoading] = useState(false);
	const [searchedItems, setSearchedItems] = useState(null);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		setHistory(Array.from(new Set(Storage.get("search-history"))));
	}, []);

	const handleSearch = async (e) => {
		e.preventDefault();
		const query = input.current.value;
		if (query.trim().length < 3) return;
		input.current.blur();
		setLoading(true);
		Storage.set("search-history", query, 5);
		const shows = await searchShows(query);
		setSearchedItems(shows);
		setHistory((h) => {
			h.unshift(query);
			return Array.from(new Set(h));
		});
		setLoading(false);
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
					ref={input}
				/>
				<datalist id="search-history">
					{history && history.map((h) => <option key={h} value={h} />)}
				</datalist>
			</form>
			<div className={styles.searchList}>
				{loading && <div className={styles.meta}>Searching...</div>}
				{searchedItems && searchedItems.length && !loading
					? searchedItems.map((item) => <Show key={item.id} show={item} />)
					: null}

				{!loading && searchedItems && !searchedItems.length ? (
					<div className={styles.meta}>not found!</div>
				) : null}
				{!loading && !searchedItems ? (
					<div className={styles.meta}>Search Any Tv Show!</div>
				) : null}
			</div>
		</div>
	);
};

export default Search;
