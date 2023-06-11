import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [BootstrapVueNextResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: '../assets',
        rollupOptions: {
            output: {
        assetFileNames: (assetInfo) => {
            // @ts-ignore
            let extType = assetInfo.name.split('.').at(1);
            // @ts-ignore
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                extType = 'img';
            }
            if (extType === 'css')
                return `${extType}/gchangelog[extname]`;

            return `${extType}/[name][extname]`;
        },
        chunkFileNames: 'js/gchangelog.js',
        entryFileNames: 'js/gchangelog.js',
},
},
},
})
