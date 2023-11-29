// src/utils/sessionStorage.ts

export interface StorageItem {
	value: any;
	expiresAt: number | null;
}

export const MySessionStorage = {
	setItem(key: string, value: any, expiresIn: number | null = null): void {
		const item: StorageItem = {
			value,
			expiresAt: expiresIn ? Date.now() + expiresIn : null
		};
		sessionStorage.setItem(key, JSON.stringify(item));
	},
	getItem(key: string): any | null {
		const itemStr = sessionStorage.getItem(key);
		if (!itemStr) return null;

		const item: StorageItem = JSON.parse(itemStr);
		console.log('item.expiresAt', item.expiresAt, 'Date.now()', Date.now());
		// if (item.expiresAt && Date.now() > item.expiresAt) {
		// 	sessionStorage.removeItem(key);
		// 	return null;
		// }
		return item.value;
	},
	removeItem(key: string): void {
		sessionStorage.removeItem(key);
	},
	clear(): void {
		sessionStorage.clear();
	},
	getRemainingSpace(): number {
		const allData = JSON.stringify(sessionStorage);
		return 5120 - new Blob([allData]).size;
	}
};
