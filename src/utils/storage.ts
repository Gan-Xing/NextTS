export interface StorageItem {
	value: any;
	expiresAt: number | null;
}

export const MySessionStorage = {
	setItem(
		key: string,
		value: any,
		expiresInOrExactTime: number | null = null,
		isExactTime: boolean = false,
		warn: boolean = false
	): void {
		let expiresAt = expiresInOrExactTime;
		if (expiresInOrExactTime !== null && !isExactTime) {
			expiresAt = Date.now() + expiresInOrExactTime * 1000;
		}

		const item: StorageItem = {
			value,
			expiresAt
		};
		sessionStorage.setItem(key, JSON.stringify(item));
		this.checkSpace(warn);
	},

	getItem(key: string, callback?: () => void): any | null {
		const itemStr = sessionStorage.getItem(key);
		if (!itemStr) return null;

		const item: StorageItem = JSON.parse(itemStr);
		if (item.expiresAt && Date.now() > item.expiresAt) {
			sessionStorage.removeItem(key);
			if (callback) callback();
			return null;
		}
		return item.value;
	},
	
	removeItem(key: string): void {
		sessionStorage.removeItem(key);
	},

	clear(): void {
		sessionStorage.clear();
	},

	setItems(items: { key: string; value: any; expiresAt?: number | null }[]): void {
		items.forEach((item) => {
			this.setItem(item.key, item.value, item.expiresAt);
		});
	},

	removeItems(keys: string[]): void {
		keys.forEach((key) => {
			this.removeItem(key);
		});
	},

	getRemainingSpace(warn: boolean = false): number {
		const allData = JSON.stringify(sessionStorage);
		const remainingSpace = 5120 - new Blob([allData]).size;
		if (warn && remainingSpace < 1024) {
			// Less than 1KB remaining
			console.warn('Warning: Approaching sessionStorage limit');
		}
		return remainingSpace;
	},

	checkSpace(warn: boolean = false): void {
		this.getRemainingSpace(warn); // This will log a warning if space is low and warn is true
	}
};
