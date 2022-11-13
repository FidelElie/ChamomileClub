import { createContext, createSignal, onCleanup, onMount, type JSX } from "solid-js";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/index";

const AuthContext = createContext({ user: null, loading: true });

const AuthProvider = (props: AuthProviderProps) => {
	const { children } = props;

	let unsubscribeAuthListener: ReturnType<typeof onAuthStateChanged>;

	const [user, setUser] = createSignal(null);
	const [loading, setLoading] = createSignal(true);

	onMount(() => {
		unsubscribeAuthListener = onAuthStateChanged(auth, async (user) => {
			try {
				setUser(user ? user : null);
			} catch (error) {

			} finally {
				setLoading(false);
			}
		});
	});

	onCleanup(() => {
		unsubscribeAuthListener();
	});

	return (
		<AuthContext.Provider value={{ user: user(), loading: loading() }}>
			{ children }
		</AuthContext.Provider>
	)
}

interface AuthProviderProps { children: JSX.Element }

export default AuthProvider;
export type { AuthProviderProps }
