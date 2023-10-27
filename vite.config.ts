import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
export default defineConfig({
  resolve: {
    alias: {
      "@common": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: "src/main.ts",
      name: "commonUtils", // 工具库名称
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [],
      output: {
        // 在 UMD 构建模式下,全局模式下为这些外部化的依赖提供一个全局变量
        name: "commonUtils",
        format: 'umd'
      },
    },
  },

  plugins: [dts()],
});
