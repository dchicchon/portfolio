import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        // modulePreload: false,
        minify: false,
        sourcemap: true // set to false for debug
    },
    plugins: [
        react(),
    ],
});