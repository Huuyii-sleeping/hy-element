import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { compression } from 'vite-plugin-compression2'
import { readFileSync } from 'fs'
import shell from 'shelljs'
import { delay } from 'lodash-es'
import hooks from './hooksPlugin'
import terser from '@rollup/plugin-terser'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'


const TRY_MOVE_STYLES_DELAY = 800 as const

function moveStyles() {
    try {
        readFileSync('./dist/umd/index.css.gz')
        shell.cp('./dist/umd/index.css', './dist/index.css')
    } catch (error) {
        delay(moveStyles, TRY_MOVE_STYLES_DELAY)
    }
}

export default defineConfig({
    plugins: [
        vue() as any,
        compression({
            include: /.(cjs|css)$/i,
        }),
        hooks({
            rmFiles: ['./dist/umd', './dist/index.css'],
            afterBuild: moveStyles,

        }),
        terser({
            compress: {
                sequences: isProd,
                arguments: isProd,
                drop_console: isProd && ['log'],
                drop_debugger: isProd,
                passes: isProd ? 4 : 1,
                global_defs: {
                    '@DEV': JSON.stringify(isDev),
                    '@PROD': JSON.stringify(isProd),
                    '@TEST': JSON.stringify(isTest),
                }
            }
        })
    ],
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
                    if (assetInfo.name === 'style.css') return 'index.css'
                    return assetInfo.name as string
                }
            }
        }
    }
})
