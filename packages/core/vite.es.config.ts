import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { readdirSync } from 'fs'
import { delay, filter, includes, map } from 'lodash-es'
import shell from 'shelljs'
import hooks from './hooksPlugin'
import terser from '@rollup/plugin-terser'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true })

    return map(
        filter(entries, (entry) => entry.isDirectory()),
        (entry) => entry.name
    )
}

const TRY_MOVE_STYLES_DELAY = 800 as const
function moveStyles() {
    try {
        readdirSync('./dist/es/theme')
        shell.cp('./dist/es/theme', './dist')
    } catch (error) {
        delay(moveStyles, TRY_MOVE_STYLES_DELAY)
    }
}

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: '../../tsconfig.build.json',
            outDir: 'dist/types'
        }) as any,
        hooks({
            rmFiles: ['./dist/es', './dist/theme', './dist/types'],
            afterBuild: moveStyles,
        }),
        // 在生产环境极致的压缩，混淆优化代码体积，在开发环境保留可读性便于调试
        terser({
            compress: {// 控制压缩行为，（删除无用代码，合并语句）
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
            },
            format: { // 控制输出函数，（美化 压缩排版）
                semicolons: false,
                shorthand: isProd,
                braces: !isProd,
                beautify: !isProd,
                comments: !isProd,
            },
            mangle: { // 控制变量名/函数名美化
                toplevel: isProd,
                eval: isProd,
                keep_classnames: isDev,
                keep_fnames: isDev
            },
        })
    ],
    build: {
        outDir: 'dist/es',
        minify: false, // 禁止代码压缩，让输出的文件保证可读性
        cssCodeSplit: true, // 对css进行分包
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'hyElement',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external: [
                'vue',
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "popperjs/core",
                "async-validator"
            ],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'index.css'
                    if (assetInfo.type === 'asset' && /\.(css)$/i.test(assetInfo.name as string)) {
                        return 'theme/[name].[ext]'
                    }
                    return assetInfo.name as string
                },
                // 进行分包处理
                manualChunks(id) {
                    // console.log(id)
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                    if (id.includes('/packages/hooks')) {
                        return 'hooks'
                    }
                    if (id.includes('/packages/utils') || id.includes('plugin-vue:export-helper')) {
                        return 'utils'
                    } 
                    for (const item of getDirectoriesSync('../components')) {
                        if (includes(id, `/packages/components/${item}`)) {
                            return item
                        }
                    } 
                }
            }
        }
    }
})
