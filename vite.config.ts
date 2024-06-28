// Vitestで用意している型定義をTypeScriptに適用させることができる。
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// ---- KumaUI ----
import KumaUI from '@kuma-ui/vite';

// tsconfigを変更すると自動的にvite.configを設定してくれる
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		KumaUI({
			// Enable WebAssembly support for Kuma UI. Default is false and will use Babel to transpile the code.
			wasm: true, // Optional
		}),
	],
	test: {
		globals: true, // 作成したテストファイルで毎回メソッドのインポートをしなくて良くなる
		environment: 'happy-dom', // 早い
		setupFiles: ['./vitest-setup.ts'],
	},
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'), // どうやらassetsから画像を取り出すためのエイリアスは、viteにも設定が必要みたい。
		},
	},
});
