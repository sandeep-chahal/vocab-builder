import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const DropDown = ({ close }) => {
	return (
		<div className={styles.dropdown} onClick={close}>
			<Link href="/youtube">
				<a className={styles.link}>Youtube</a>
			</Link>
			<Link href="/custom">
				<a className={styles.link}>Custom</a>
			</Link>
			<Link href="/search">
				<a className={styles.link}>Search</a>
			</Link>
		</div>
	);
};

export default DropDown;
