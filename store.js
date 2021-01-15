import { createContext, useReducer, useContext } from "react";

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const Context = createContext();

export const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	return (
		<Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
	);
};

const useStore = () => useContext(Context);
