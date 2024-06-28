// Vitestで用意している型定義をTypeScriptに適用させることができる。
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ---- KumaUI ----
import KumaUI from "@kuma-ui/vite";

// tsconfigを変更すると自動的にvite.configを設定してくれる
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), KumaUI({
		// Enable WebAssembly support for Kuma UI. Default is false and will use Babel to transpile the code.
		wasm: true // Optional
	}),],
	test: {
		globals: true, // 作成したテストファイルで毎回メソッドのインポートをしなくて良くなる
		environment: 'happy-dom', // 早い
		setupFiles: ['./vitest-setup.ts'],
	},
});
