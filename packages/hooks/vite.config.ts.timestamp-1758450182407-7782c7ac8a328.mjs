// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/Lenovo/Desktop/element/hy-element/node_modules/.pnpm/vite@5.4.20_@types+node@20.19.13_terser@5.44.0/node_modules/vite/dist/node/index.js";
import { last, split, first, includes } from "file:///C:/Users/Lenovo/Desktop/element/hy-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import { hooksPlugin as hooks } from "file:///C:/Users/Lenovo/Desktop/element/hy-element/libs/vite-plugins/.dist/index.js";
import dts from "file:///C:/Users/Lenovo/Desktop/element/hy-element/node_modules/.pnpm/vite-plugin-dts@3.9.1_@type_facc149c7d3ac1d3188fc4722228506f/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Lenovo\\Desktop\\element\\hy-element\\packages\\hooks";
var vite_config_default = defineConfig(({ mode }) => ({
  test: {
    environment: "jsdom"
  },
  plugins: [
    dts({
      include: ["./**/*.ts"],
      exclude: ["./vite.config.ts"]
    }),
    hooks({
      rmFiles: mode !== "test" ? ["./dist"] : []
      // 👈 关键：测试模式不删除
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "hooks",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue", "lodash-es", "vue3-i18n"],
      output: {
        manualChunks(id) {
          if (includes(id, "/packages/hooks/use"))
            return first(split(last(split(id, "/")), "."));
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMZW5vdm9cXFxcRGVza3RvcFxcXFxlbGVtZW50XFxcXGh5LWVsZW1lbnRcXFxccGFja2FnZXNcXFxcaG9va3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXGVsZW1lbnRcXFxcaHktZWxlbWVudFxcXFxwYWNrYWdlc1xcXFxob29rc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTGVub3ZvL0Rlc2t0b3AvZWxlbWVudC9oeS1lbGVtZW50L3BhY2thZ2VzL2hvb2tzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IGxhc3QsIHNwbGl0LCBmaXJzdCwgaW5jbHVkZXMgfSBmcm9tICdsb2Rhc2gtZXMnXHJcbmltcG9ydCB7IGhvb2tzUGx1Z2luIGFzIGhvb2tzIH0gZnJvbSAnQGh5LWVsZW1lbnQvdml0ZS1wbHVnaW5zJ1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbSdcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgZHRzKHtcclxuICAgICAgICAgICAgaW5jbHVkZTogWycuLyoqLyoudHMnXSxcclxuICAgICAgICAgICAgZXhjbHVkZTogWycuL3ZpdGUuY29uZmlnLnRzJ10sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaG9va3Moe1xyXG4gICAgICAgICAgICBybUZpbGVzOiBtb2RlICE9PSAndGVzdCcgPyBbJy4vZGlzdCddIDogW10sIC8vIFx1RDgzRFx1REM0OCBcdTUxNzNcdTk1MkVcdUZGMUFcdTZENEJcdThCRDVcdTZBMjFcdTVGMEZcdTRFMERcdTUyMjBcdTk2NjRcclxuICAgICAgICB9KSxcclxuICAgIF0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICAgICAgbGliOiB7XHJcbiAgICAgICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vaW5kZXgudHMnKSxcclxuICAgICAgICAgICAgbmFtZTogJ2hvb2tzJyxcclxuICAgICAgICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZXh0ZXJuYWw6IFsndnVlJywgJ2xvZGFzaC1lcycsICd2dWUzLWkxOG4nXSxcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZXMoaWQsICcvcGFja2FnZXMvaG9va3MvdXNlJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdChzcGxpdChsYXN0KHNwbGl0KGlkLCAnLycpKSwgJy4nKSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pKSJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlcsU0FBUyxlQUFlO0FBQ3JZLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsTUFBTSxPQUFPLE9BQU8sZ0JBQWdCO0FBQzdDLFNBQVMsZUFBZSxhQUFhO0FBQ3JDLE9BQU8sU0FBUztBQUpoQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3ZDLE1BQU07QUFBQSxJQUNGLGFBQWE7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLE1BQ0EsU0FBUyxDQUFDLFdBQVc7QUFBQSxNQUNyQixTQUFTLENBQUMsa0JBQWtCO0FBQUEsSUFDaEMsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0YsU0FBUyxTQUFTLFNBQVMsQ0FBQyxRQUFRLElBQUksQ0FBQztBQUFBO0FBQUEsSUFDN0MsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDdEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNsQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1gsVUFBVSxDQUFDLE9BQU8sYUFBYSxXQUFXO0FBQUEsTUFDMUMsUUFBUTtBQUFBLFFBQ0osYUFBYSxJQUFJO0FBQ2IsY0FBSSxTQUFTLElBQUkscUJBQXFCO0FBQ2xDLG1CQUFPLE1BQU0sTUFBTSxLQUFLLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxRQUNyRDtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
