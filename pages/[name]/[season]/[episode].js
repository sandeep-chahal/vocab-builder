import { useState, useMemo } from "react";
import Head from "next/head";
import getEpisodeData from "../../../services/getEpisodeData";
import styles from "../../../styles/dashboard.module.css";
import DefinitionModal from "../../../components/definitionModal";
import ShowSelector from "../../../components/showSelector";

const Dashboard = ({ error, subtitle, words, name, season, episode }) => {
	if (error) {
		return <div className={styles.meta}>Something Went Wrong</div>;
	}
	const [change, setChange] = useState(false);
	const [selectedWord, setSelectedWord] = useState(null);
	const [toggle, setToggle] = useState(false);
	const wordsList = Object.keys(words);

	const handleGetDefinition = (e) => {
		if (e.target.id != "word") return;
		const word = e.target.textContent;
		setSelectedWord(word);
	};

	const handleWordSelect = (word) => {
		setSelectedWord(word);
	};

	const formattedSubs = useMemo(() => {
		console.log("generating subtitles");
		let temp = "";
		let currentLine = [];
		let result = [];
		subtitle.forEach((line, i) => {
			line.split(" ").forEach((word) => {
				let newWord = word
					.replace(/[\?\!\"\-\.\,\']/g, "")
					.trim()
					.toLowerCase();

				if (newWord in words) {
					currentLine.push(
						<span key={uuidv4()} className={styles.line}>
							{temp}
						</span>
					);
					currentLine.push(
						<span
							key={uuidv4()}
							className={styles.learn}
							onClick={() => handleWordSelect(newWord)}
						>
							{word}
						</span>
					);
					temp = "";
				} else temp = temp + " " + word;
			});
			if (temp.trim()) {
				currentLine.push(
					<span key={uuidv4()} className={styles.line}>
						{temp}
					</span>
				);
				temp = "";
			}
			result.push({
				key: uuidv4(),
				line: currentLine,
			});
			currentLine = [];
		}, []);
		return result;
	}, []);

	return (
		<div className={styles.dashboard}>
			<Head>
				<title>{name}</title>
			</Head>
			{selectedWord && (
				<DefinitionModal
					word={selectedWord}
					close={() => setSelectedWord(null)}
				/>
			)}
			{change && (
				<ShowSelector
					name={name}
					cancel={() => setChange(false)}
					defaultSeason={season}
					defaultEpisode={episode}
				/>
			)}
			<div className={styles.header}>
				<h2 className={styles.h2}>
					<span>
						{name} S{season}E{episode}
					</span>
					<svg
						onClick={() => setChange(true)}
						className={styles.change}
						xmlns="http://www.w3.org/2000/svg"
						fill="#000"
						viewBox="0 0 50 50"
						width="20px"
						height="20px"
					>
						<path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z" />
					</svg>
				</h2>
				<div className={styles.info}>
					<span>Words: {wordsList.length}</span>
					<label className={styles.switch}>
						<input
							className={styles.input}
							onChange={() => setToggle((prev) => !prev)}
							type="checkbox"
							value={toggle}
						/>
						<span className={styles.slider}></span>
					</label>
				</div>
			</div>
			{!toggle && (
				<ul className={styles.wordList} onClick={handleGetDefinition}>
					{wordsList.map((word) => (
						<li id="word" key={word} className={styles.word}>
							{word}
						</li>
					))}
				</ul>
			)}
			{toggle && (
				<p className={styles.subtitles}>
					{formattedSubs.map((sub) => (
						<div key={sub.key}>{sub.line}</div>
					))}
				</p>
			)}
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const { name, season, episode } = context.query;
	let result = await getEpisodeData(name, season, episode);
	return {
		props: {
			error: result === null,
			...(result || {}),
			name,
			season,
			episode,
		},
	};
};

export default Dashboard;
function uuidv4() {
	return "xxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
