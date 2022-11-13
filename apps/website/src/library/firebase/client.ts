import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_APP_ID,
	VITE_FIREBASE_MEASUREMENT_ID
} = import.meta.env;

const initialiseFirebaseClient = () => {
	const firebaseConfig = {
		apiKey: VITE_FIREBASE_API_KEY,
		authDomain: VITE_FIREBASE_AUTH_DOMAIN,
		projectId: VITE_FIREBASE_PROJECT_ID,
		storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
		appId: VITE_FIREBASE_APP_ID,
		// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
		measurementId: VITE_FIREBASE_MEASUREMENT_ID,
	};

	if (getApps().length <= 0) {
		const app = initializeApp(firebaseConfig)
		// Check that `window` is in scope for the analytics module!
		if (typeof window !== 'undefined') {
			// Enable analytics. https://firebase.google.com/docs/analytics/get-started
			if ('measurementId' in firebaseConfig) {
				getAnalytics()
			}
		}
		return app;
	}
}

export default initialiseFirebaseClient;
