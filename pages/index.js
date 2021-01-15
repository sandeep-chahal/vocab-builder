import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Learn Vocabulary Words</title>
			</Head>
		</div>
	);
}

export const getStaticProps = () => {
	return {
		props: {},
		revalidate: 1000 * 60 * 60,
	};
};
