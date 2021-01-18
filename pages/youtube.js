import { useState, useMemo, useEffect } from "react";
import styles from "../styles/youtube.module.css";
import YouTubePlayer from "react-youtube";
import getYoutubeData from "../utils/getYoutbeData";
import DefinitionModal from "../components/definitionModal";
import Head from "next/head";
import { getYtId } from "../utils";

const Youtube = () => {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [ready, setReady] = useState(false);
	const [error, setError] = useState(null);
	const [subtitles, setSubtitles] = useState(null);
	const [words, setWords] = useState(null);
	const [toggle, setToggle] = useState(false);
	const [selectedWord, setSelectedWord] = useState(null);

	const renderSubtitles = useMemo(() => {
		if (!subtitles) return null;
		let data = [];
		let temp = "";
		subtitles.forEach((sub, i) => {
			sub.text.split(" ").forEach((w) => {
				let word = w
					.replace("'", "")
					.replace(".", "")
					.replace("[", "")
					.replace("]", "")
					.replace("-", "")
					.toLowerCase();
				if (word in words) {
					data.push(
						<span key={uuidv4()} className={styles.line}>
							{temp}
						</span>
					);
					data.push(
						<span
							onClick={() => setSelectedWord(word)}
							key={uuidv4()}
							className={styles.learn}
						>
							{word}
						</span>
					);
					temp = "";
				} else temp = temp + " " + word;
			});
		});
		data.push(
			<span key="last_one" className={styles.line}>
				{temp}
			</span>
		);
		return data;
	}, [subtitles]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const result = await getYoutubeData(url);
		console.log(error);
		if (result.error) {
			setError(result.msg);
		} else {
			setWords(result.words);
			setSubtitles(result.subtitles);
			setReady(true);
		}
		setLoading(false);
	};

	const totalWords = useMemo(() => Object.keys(words || {}).length, [words]);

	const handleWordClick = (e) => {
		if (e.target.id === "learn") {
			setSelectedWord(e.target.textContent);
		}
	};
	const handleReset = () => {
		setUrl(null);
		setReady(false);
		setSubtitles(null);
		setWords(null);
		setToggle(null);
		setSelectedWord(null);
	};
	return (
		<div className={styles.youtube}>
			<Head>
				<title>Youtube | Learn Vocabulary Words</title>
			</Head>
			{selectedWord && (
				<DefinitionModal
					word={selectedWord}
					close={() => setSelectedWord(null)}
				/>
			)}
			{!loading && !ready && (
				<form className={styles.inputWrapper} onSubmit={handleSubmit}>
					<input
						autoFocus
						className={styles.input}
						placeholder="Enter youtube video url"
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button className={styles.button} type="submit">
						Go Get It!
					</button>
				</form>
			)}
			{loading && <div className={styles.info}>Wait...</div>}
			{error && <div className={styles.info}>{error}</div>}
			{ready && (
				<div className={styles.main}>
					<YouTubePlayer className={styles.player} videoId={getYtId(url)} />
					<div className={styles.vocab}>
						<div className={styles.heading}>
							<h2>{toggle ? "Subtitles" : "Words"}</h2>{" "}
							<span className={styles.wordCount}>({totalWords})</span>
							<svg
								onClick={handleReset}
								className={styles.reset}
								xmlns="http://www.w3.org/2000/svg"
								fill="#fff"
								viewBox="0 0 50 50"
								width="20px"
								height="20px"
							>
								<path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 A 1.0001 1.0001 0 1 0 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 C 31.692686 4 37.635193 7.130711 41.480469 12 L 35 12 A 1.0001 1.0001 0 1 0 35 14 L 43.449219 14 L 45 14 L 45 4 A 1.0001 1.0001 0 0 0 43.984375 2.9863281 A 1.0001 1.0001 0 0 0 43 4 L 43 10.699219 C 38.785186 5.4020866 32.287796 2 25 2 z" />
							</svg>
						</div>
						<label className={styles.switch}>
							<input
								className={styles.input}
								onChange={() => setToggle((prev) => !prev)}
								type="checkbox"
								value={toggle}
							/>
							<span className={styles.slider}></span>
						</label>
						{!toggle && (
							<div className={styles.words} onClick={handleWordClick}>
								{Object.keys(words).map((word) => (
									<div id="learn" key={word} className={styles.learn}>
										{word}
									</div>
								))}
							</div>
						)}
						{toggle && <p className={styles.subtitles}>{renderSubtitles}</p>}
					</div>
				</div>
			)}
		</div>
	);
};
export default Youtube;

function uuidv4() {
	return "xxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
