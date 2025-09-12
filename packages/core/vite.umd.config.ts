import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue() as any],
    build: {
        outDir: 'dist/umd',
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'hyElement',
            fileName: 'index',
            formats: ['umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                },
                assetFileNames: (assetInfo) => {
                    if(assetInfo.name === 'style.css')return 'index.css'
                    return assetInfo.name as string
                }
            }
        }
    }
})
