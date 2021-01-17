import Nav from "../nav";

const Layout = ({ children }) => {
	return (
		<div>
			<Nav />
			{children}
		</div>
	);
};

export default Layout;
