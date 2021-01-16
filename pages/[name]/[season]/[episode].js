import { useState } from "react";
import Head from "next/head";
import getEpisodeData from "../../../services/getEpisodeData";
import styles from "../../../styles/dashboard.module.css";
import DefinitionModal from "../../../components/definitionModal";

const Dashboard = ({ error, subtitles, words, name }) => {
	if (error) {
		return <div>Something Went Wrong</div>;
	}
	const [selectedWord, setSelectedWord] = useState(null);
	const wordsList = Object.keys(words);

	const handleGetDefinition = (e) => {
		if (e.target.id != "word") return;
		const word = e.target.textContent;
		setSelectedWord(word);
	};

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
			<ul className={styles.wordList} onClick={handleGetDefinition}>
				{wordsList.map((word) => (
					<li id="word" key={word} className={styles.word}>
						{word}
					</li>
				))}
			</ul>
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const { name, season, episode } = context.query;
	console.log(context.query);
	let result = await getEpisodeData(name, season, episode);
	return {
		props: {
			error: result === null,
			...(result || {}),
			name,
		},
	};
};

export default Dashboard;
