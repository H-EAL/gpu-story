import { defineConfig, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

// https://vite.dev/config/
export default defineConfig((env: ConfigEnv) => ({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        tailwindcss(),
        mdx({ remarkPlugins: [remarkGfm] }),
    ],
    base: env.command === "build" ? "/gpu-story" : "/",
}));
