import getEpisodeData from "../../../services/getEpisodeData";
import styles from "../../../styles/dashboard.module.css";

const Dashboard = ({ error, subtitles, words }) => {
	if (error) {
		return <div>Something Went Wrong</div>;
	}
	const wordsList = Object.keys(words);
	return (
		<div className={styles.dashboard}>
			<ul className={styles.wordList}>
				{wordsList.map((word) => (
					<li key={word} className={styles.word}>
						<a
							target="_blank"
							href={`https://dictionary.cambridge.org/dictionary/english/${word}`}
						>
							{word}
						</a>
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
