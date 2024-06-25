import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        // https://stackoverflow.com/a/71358283
        rollupOptions: {
            input: {
                'service-worker': './src/service-worker/main.js',
            },
            output: {
                entryFileNames(assetInfo) {
                    return assetInfo.name === 'service-worker'
                        ? '[name].js'
                        : 'assets/js/[name]-[hash].js';
                },
            },
        },
    },
});
