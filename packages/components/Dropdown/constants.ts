import type { InjectionKey } from "vue";
import type { DropdownContent } from "./types";

export const DROPDOWN_CTX_KEY: InjectionKey<DropdownContent> = Symbol('dropdownContent')