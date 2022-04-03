/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SERVER_HOST: string;
	readonly VITE_SERVER_PORT: string;
	readonly VITE_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
