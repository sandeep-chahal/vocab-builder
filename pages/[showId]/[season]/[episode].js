import { useState } from "react";
import getEpisodeData from "../../../services/getEpisodeData";
import styles from "../../../styles/dashboard.module.css";
import DefinitionModal from "../../../components/definitionModal";

const Dashboard = ({ error, subtitles, words }) => {
	if (error) {
		return <div>Something Went Wrong</div>;
	}
	const [selectedWord, setSelectedWord] = useState(null);
	const wordsList = Object.keys(words);

	const handleGetDefinition = (e) => {
		setSelectedWord(e.target.textContent);
	};

	return (
		<div className={styles.dashboard}>
			{selectedWord && (
				<DefinitionModal
					word={selectedWord}
					close={() => setSelectedWord(null)}
				/>
			)}
			<ul className={styles.wordList} onClick={handleGetDefinition}>
				{wordsList.map((word) => (
					<li key={word} className={styles.word}>
						{word}
					</li>
				))}
			</ul>
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const { showId, season, episode } = context.query;
	console.log(context.query);
	let result = await getEpisodeData(showId, season, episode);
	return {
		props: {
			error: result === null,
			...(result || {}),
		},
	};
};

export default Dashboard;
