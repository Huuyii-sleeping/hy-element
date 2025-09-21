import {
  inject,
  ref
} from "./chunk-JB26MSJG.js";

// ../../node_modules/.pnpm/vue3-i18n@1.1.5_vue@3.5.21_typescript@5.8.3_/node_modules/vue3-i18n/dist/vue3-i18n.esm.js
var n = Symbol("i18n");
var r = (e, t, n2) => {
  const o2 = e[0];
  if (~o2.indexOf("[")) {
    const [l2, a] = o2.split("["), s = parseInt(a.replace("]", ""));
    if (s > -1) {
      if (!t[l2] && t[l2].length > 0 && t[l2][s] && "" !== t[l2][s]) throw new Error("Not Found");
      return 1 === e.length ? "string" == typeof t[l2][s] ? t[l2][s] : "" : r(e.slice(1), t[l2][s], n2);
    }
    throw new Error(`Not Found: ${o2}`);
  }
  if (t[e[0]] || "" === t[e[0]]) {
    if (1 === e.length) {
      let r2 = "string" == typeof t[e[0]] ? t[e[0]] : "";
      return n2 && (r2 = ((e2, t2) => {
        const n3 = /{(\w*)}/g;
        let r3, o3 = e2;
        for (; null !== (r3 = n3.exec(e2)); ) {
          if (!Object.prototype.hasOwnProperty.call(t2, r3[1])) throw new Error(`Not Found Params: ${r3[1]}`);
          o3 = o3.replace(r3[0], t2[r3[1]]);
        }
        return o3;
      })(r2, n2)), r2;
    }
    return r(e.slice(1), t[e[0]], n2);
  }
  throw new Error("Not Found");
};
var o = (t) => {
  const o2 = ref(t.locale || "en"), l2 = t.messages;
  return { messages: l2, t: (e, t2) => {
    const n2 = l2[o2.value] || l2.en;
    if ("string" != typeof e) return console.warn("Warn(i18n):", "keypath must be a type of string"), "";
    try {
      return r(e.split("."), n2, t2);
    } catch (t3) {
      return console.warn(`Warn(i18n): the keypath '${e}' not found`), "";
    }
  }, setLocale: (e) => {
    l2[e] || console.warn(`Warn(i18n): the '${e}' language pack not found, fall back to English language pack`), o2.value = e;
  }, getLocale: () => o2.value, install(e) {
    const t2 = this;
    e.provide(n, t2), e.config.globalProperties.$t = t2.t, e.config.globalProperties.$i18n = t2;
  } };
};
function l() {
  return inject(n);
}
export {
  o as createI18n,
  n as i18nSymbol,
  l as useI18n
};
//# sourceMappingURL=vue3-i18n.js.map
