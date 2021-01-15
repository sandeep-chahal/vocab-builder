import styles from "./styles.module.css";

const Layout = ({ children }) => {
	return (
		<div>
			<nav className={styles.nav}>Vocab Builder</nav>
			{children}
		</div>
	);
};

export default Layout;
