import styles from "./show.module.css";

const Show = ({ show }) => {
	return (
		<div className={styles.showWrapper}>
			<img
				className={styles.poster}
				src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
			/>
			<div className={styles.info}>
				<div className={styles.space}></div>
				<h3 className={styles.name}>{show.name || show.original_name}</h3>
				<div className={styles.rating}>
					<svg
						className={styles.ratingLogo}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 50 50"
						width="15px"
						height="15px"
					>
						<path
							fill="none"
							stroke="#fff"
							strokeLinejoin="round"
							strokeMiterlimit="10"
							strokeWidth="2"
							d="M25 2L31.4 18.5 49 19.4 35.3 30.6 39.8 47.6 25 38.1 10.2 47.6 14.7 30.6 1 19.4 18.6 18.5z"
						/>
					</svg>
					<span>{show.vote_average}</span>
				</div>
			</div>
		</div>
	);
};

export default Show;
