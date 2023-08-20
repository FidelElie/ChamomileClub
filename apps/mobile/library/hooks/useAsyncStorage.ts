import { useEffect, useState } from 'react'
;
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = <T = unknown>(key: string, initialValue: T) => {
	const [storageValue, setStorageValue] = useState<T>();

	const setNewValue = async (value: T) => {
		await AsyncStorage.setItem(key, JSON.stringify(value))
		setStorageValue(value)
	}

	useEffect(() => {
		const resolveInitialValue = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem(key);

				if (jsonValue === null) {
					return AsyncStorage.setItem(key, JSON.stringify(initialValue));
				}

				setStorageValue(JSON.parse(jsonValue));
			} catch (error: any) {
				console.log("Async storage error");
			}
		}

		resolveInitialValue();
	}, [key, initialValue]);

	return [storageValue, setNewValue] as const;
}