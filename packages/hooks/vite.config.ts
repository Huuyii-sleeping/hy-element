import { resolve } from 'path'
import { defineConfig } from 'vite'
import { last, split, first, includes } from 'lodash-es'
import { hooksPlugin as hooks } from '@hy-element/vite-plugins'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => ({
    test: {
        environment: 'jsdom'
    },
    plugins: [
        dts({
            include: ['./**/*.ts'],
            exclude: ['./vite.config.ts'],
        }),
        hooks({
            rmFiles: mode !== 'test' ? ['./dist'] : [], // 👈 关键：测试模式不删除
        }),
    ],
    build: {
        minify: false,
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'hooks',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue', 'lodash-es', 'vue3-i18n'],
            output: {
                manualChunks(id) {
                    if (includes(id, '/packages/hooks/use'))
                        return first(split(last(split(id, '/')), '.'))
                },
            },
        },
    },
}))