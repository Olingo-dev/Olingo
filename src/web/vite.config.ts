import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "build",
		emptyOutDir: true,
		minify: "terser",
		rollupOptions: {
			treeshake: true,
		},
	},
	server: {
		proxy: {
			"/api": "http://127.0.0.1:8080"
		}
	}
});

