import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        // drop: ['console', 'debugger']
    },
    plugins: [
        react(),
    ],
});