import { useState, useMemo } from "react";
import styles from "../styles/custom.module.css";
import DefinitionModal from "../components/definitionModal";
import { getCustomData, imageToText } from "../utils/fetch";
import Head from "next/head";
import { reduceImageSize } from "../utils";

const Custom = () => {
	const [loading, setLoading] = useState(false);
	const [fileProcessing, setFileProcessing] = useState(null);
	const [text, setText] = useState("");
	const [words, setWords] = useState(null);
	const [error, setError] = useState(false);
	const [selected, setSelected] = useState(null);

	const handleParseText = async () => {
		setLoading(true);
		setError(false);
		const words = await getCustomData(text);
		if (words) setWords(words);
		else setError(true);
		setLoading(false);
	};

	const handleWordClick = (word) => {
		setSelected(word);
	};

	const renderPara = useMemo(() => {
		if (!words || !text) return null;
		console.log("rendering para");

		let temp = "";
		const data = text.split(" ").reduce((prev, word, i) => {
			const newWord = word.replace(".", " ").replace(",", " ").toLowerCase();
			if (newWord in words) {
				if (temp) {
					prev.push(
						<span key={i} className={styles.line}>
							{temp}
						</span>
					);
					temp = "";
				}
				prev.push(
					<span
						onClick={() => handleWordClick(newWord)}
						key={i + 1}
						className={styles.learn}
					>
						{word}
					</span>
				);
				return prev;
			} else {
				temp = temp + " " + word;
				return prev;
			}
		}, []);
		data.push(
			<span key="last_one" className={styles.line}>
				{temp}
			</span>
		);
		return <p className={styles.para}>{data}</p>;
	}, [words, text]);

	const handleReset = () => {
		setText("");
		setWords(null);
		setSelected(null);
	};

	const handleImage = async (e) => {
		if (loading) return;
		setFileProcessing(true);
		setError(false);
		setLoading(true);
		if (!e.target.files || !e.target.files[0].type.includes("image/")) {
			setError("Please upload images only!");
			setLoading(false);
			setFileProcessing(false);
			return;
		}
		const img = await reduceImageSize(e.target.files[0]);
		const text = await imageToText(img);
		const words = await getCustomData(text);
		if (words) {
			setText(text);
			setWords(words);
		} else setError(true);
		setLoading(false);
		setError(false);
		setFileProcessing(false);
	};
	return (
		<div className={styles.custom}>
			<Head>
				<title>Custom Text or Image</title>
			</Head>
			<h2 className={styles.header}>
				<span>Custom Text or Image</span>
				{words && (
					<svg
						onClick={handleReset}
						className={styles.reset}
						xmlns="http://www.w3.org/2000/svg"
						fill="#000"
						viewBox="0 0 50 50"
						width="20px"
						height="20px"
					>
						<path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 A 1.0001 1.0001 0 1 0 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 C 31.692686 4 37.635193 7.130711 41.480469 12 L 35 12 A 1.0001 1.0001 0 1 0 35 14 L 43.449219 14 L 45 14 L 45 4 A 1.0001 1.0001 0 0 0 43.984375 2.9863281 A 1.0001 1.0001 0 0 0 43 4 L 43 10.699219 C 38.785186 5.4020866 32.287796 2 25 2 z" />
					</svg>
				)}
			</h2>
			{selected && (
				<DefinitionModal word={selected} close={() => setSelected(null)} />
			)}
			{!words && (
				<div className={styles.inputWrapper}>
					<input type="file" className={styles.file} onChange={handleImage} />
					<textarea
						className={styles.textarea}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter any text"
					></textarea>

					<button
						disabled={loading}
						className={styles.button}
						onClick={handleParseText}
					>
						{loading ? "Wait!" : "Go!"}
					</button>
					{fileProcessing && (
						<span className={styles.wait}>This might take a while!</span>
					)}
				</div>
			)}
			{error && (
				<div className={styles.error}>
					{typeof error === "string" ? error : "Something Went Wrong!"}
				</div>
			)}
			{words && renderPara}
		</div>
	);
};
export default Custom;
