import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getShowInfo } from "../../utils/fetch";
import styles from "./showSelector.module.css";

const ShowSelector = ({
	name,
	showId,
	cancel,
	defaultSeason = 1,
	defaultEpisode = 1,
}) => {
	const [totalSeasons, setTotalSeasons] = useState(null);
	const [season, setSeason] = useState(defaultSeason);
	const [episode, setEpisode] = useState(defaultEpisode);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (!showId) return;
			const seasons = await getShowInfo(showId);
			setTotalSeasons(seasons);
		})();
	}, []);

	return (
		<div className={styles.selectorWrapper}>
			<div className={styles.selector}>
				<h2 className={styles.header}>{name}</h2>
				<div className={styles.label}>
					<label>Season</label>
					{totalSeasons && <span>{`(1-${totalSeasons.length})`}</span>}
				</div>
				<input
					className={styles.input}
					type="number"
					value={season}
					onChange={(e) => setSeason(e.target.value)}
				/>
				<div className={styles.label}>
					<label>Episode</label>
					{totalSeasons && <span>(1-{totalSeasons[season - 1]})</span>}
				</div>
				<input
					className={styles.input}
					type="number"
					value={episode}
					onChange={(e) => setEpisode(e.target.value)}
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
