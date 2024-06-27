// Vitestで用意している型定義をTypeScriptに適用させることができる。
/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// tsconfigを変更すると自動的にvite.configを設定してくれる
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true, // 作成したテストファイルで毎回メソッドのインポートをしなくて良くなる
    environment: "happy-dom", // 早い
    setupFiles: ["./vitest-setup.ts"],
  },
});
