import { useState } from "react";
import styles from "./definition.module.css";

const Dictionary = ({ word, close }) => {
	const [activeTab, setActiveTab] = useState("def");

	return (
		<div className={styles.modal}>
			<div className={styles.dictionary}>
				<div className={styles.tabs}>
					<div className={styles.tabGrp}>
						<div
							style={
								activeTab === "def"
									? { background: "var(--color-secondary)" }
									: {}
							}
							onClick={() => setActiveTab("def")}
							className={styles.tab}
						>
							Definition
						</div>
						<div
							style={
								activeTab === "sentences"
									? { background: "var(--color-secondary)" }
									: {}
							}
							onClick={() => setActiveTab("sentences")}
							className={styles.tab}
						>
							Sentences
						</div>
					</div>
					<div onClick={close} className={styles.tab}>
						Close
					</div>
				</div>
				<div className={styles.body}>
					<iframe
						sandbox="allow-same-origin allow-scripts"
						title={`${word} definition`}
						src={`https://dictionary.cambridge.org/dictionary/english/${word}`}
						style={{ display: activeTab === "def" ? "block" : "none" }}
						className={styles.iframe}
					></iframe>
					<iframe
						title={`${word} sentences`}
						sandbox=""
						src={`https://sentence.yourdictionary.com/${word}`}
						style={{ display: activeTab === "sentences" ? "block" : "none" }}
						className={styles.iframe}
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default Dictionary;
