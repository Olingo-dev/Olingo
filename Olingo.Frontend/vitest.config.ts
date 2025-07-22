import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests/setup.ts"
    },
})