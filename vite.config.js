import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react-swc';


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    if (mode === 'production') {
        return {
            esbuild: {
                drop: ['console', 'debugger']
            },
            plugins: [
                react(),
            ],
        }
    }
    return {
        plugins: [
            react(),
        ],
    }


});