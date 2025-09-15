import type { Language, TranslatePair } from "@hy-element/locale";

export interface ConfigProviderProps {
    locale?: Language
    extendsI18nMsg?: TranslatePair
}
