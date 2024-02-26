export const withAssets = (path: string) => `/${path}`;

// -----------------------------
export function safeJSONParse<T = unknown>(data: T, fallback?: T): T {
	try {
		return (typeof data === 'string' ? JSON.parse(data) : data) as T;
	} catch (error) {
		return fallback || data;
	}
}

// -----------------------------
type Env = {
	NEXT_PUBLIC_API_URI: string;
	NEXT_PUBLIC_XYZ: {
		a: string;
		b: number;
	};
};

export function getEnv<K extends keyof Env>(key: K): Env[K] {
	return safeJSONParse<Env[K]>(process.env[key] as Env[K]);
}
