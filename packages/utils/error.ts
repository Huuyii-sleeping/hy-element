import { isString } from "lodash-es";

class hyUIError extends Error {
    constructor(msg: string) {
        super(msg)
        this.name = 'hyUIERROR'
    }
}

function createError(scope: string, msg: string) {
    return new hyUIError(`[${scope}]: ${msg}`)
}

export function throwError(scope: string, msg: string) {
    throw createError(scope, msg) // 组件名 + 错误信息的样子
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
    if (process.env.NODE_ENV !== 'production') {
        const err = isString(scope) ? new hyUIError(`[${scope}]: ${msg}`) : scope
        console.warn(err)
    }
}
/**
 * 封装的前端工具函数：封装错误抛出，开发环境调试警告的统一逻辑处理
 * 统一错误格式，提升可维护性，增强开发体验，避免生产环境输出无用的警告
 */