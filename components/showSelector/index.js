import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getShowInfo } from "../../utils/fetch";
import styles from "./showSelector.module.css";

const ShowSelector = ({ name, showId, cancel }) => {
	const [totalSeasons, setTotalSeasons] = useState(null);
	const [season, setSeason] = useState(100);
	const [episode, setEpisode] = useState(100);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const seasons = await getShowInfo(showId);
			if (seasons === null) return alert("something went wrong");
			// if user selected wrong season and episode number already
			if (!(season > 0) || !(season <= seasons.length)) {
				setSeason(1);
				setEpisode(1);
			} else if (!(episode > 0) || !(episode <= seasons[season].length))
				setEpisode(1);
			setTotalSeasons(seasons);
		})();
	}, []);

	const handleSeasonChange = (e) => {
		const value = parseInt(e.target.value);
		if (totalSeasons) {
			if (value > 0 && value <= totalSeasons.length) setSeason(value);
		} else setSeason(value);
	};
	const handleEpisodeChange = (e) => {
		const value = parseInt(e.target.value);

		if (totalSeasons) {
			if (value > 0 && value <= totalSeasons[season - 1]) setEpisode(value);
		} else setEpisode(value);
	};
	return (
		<div className={styles.selectorWrapper}>
			<div className={styles.selector}>
				<div className={styles.label}>
					<label>Season</label>
					{totalSeasons && <span>{`(1-${totalSeasons.length})`}</span>}
				</div>
				<input
					className={styles.input}
					type="number"
					value={season}
					onChange={handleSeasonChange}
				/>
				<div className={styles.label}>
					<label>Episode</label>
					{totalSeasons && <span>(1-{totalSeasons[season - 1]})</span>}
				</div>
				<input
					className={styles.input}
					type="number"
					value={episode}
					onChange={handleEpisodeChange}
				/>
				<div className={styles.buttonGrp}>
					<button onClick={cancel} className={styles.button}>
						Cancel
					</button>
					<button
						onClick={() => router.push(`/${name}/${season}/${episode}`)}
						className={styles.button}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShowSelector;
