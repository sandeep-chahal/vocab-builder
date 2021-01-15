import { Provider } from "../store";
import { Router } from "next/router";
import "../styles/globals.css";

import Layout from "../components/layout";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
