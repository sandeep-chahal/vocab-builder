import styles from "./styles.module.css";
import Link from "next/link";

const Layout = ({ children }) => {
	return (
		<div>
			<nav className={styles.nav}>
				<Link href="/">
					<a className={styles.header}>
						<div className={styles.logo} />
						<h2>Vocab Builder</h2>
					</a>
				</Link>
			</nav>
			{children}
		</div>
	);
};

export default Layout;
