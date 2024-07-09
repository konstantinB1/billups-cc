import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'src',
    plugins: [react()],
    server: {
        host: true,
        port: 3000
    },
    resolve: {
        alias: {
            '@assets': '/assets',
            '@components': '/components'
        }
    }
});
