import React, { useEffect, useState } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getTrendingShows } from "../services/shows";
import Show from "../components/show";
import ShowSelector from "../components/showSelector";

export default function Home({ shows }) {
	const [selected, setSelected] = useState(null);
	return (
		<div className={styles.container}>
			<Head>
				<title>Learn Vocabulary Words</title>
			</Head>
			{selected && (
				<ShowSelector showId={selected} cancel={() => setSelected(null)} />
			)}
			<section>
				<h2 className={styles.heading}>Trending Shows</h2>
				<div className={styles.latestShows}>
					{shows.map((show) => (
						<Show key={show.id} show={show} select={setSelected} />
					))}
				</div>
			</section>
		</div>
	);
}

export const getStaticProps = async () => {
	const shows = await getTrendingShows();
	return {
		props: {
			shows,
		},
		revalidate: 1000 * 60 * 60,
	};
};
