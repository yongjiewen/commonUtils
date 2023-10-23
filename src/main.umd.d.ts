import * as all from "./index";
export * from "./index"

declare global {
    interface Window {
        commonUtils: typeof all;
    }
}
export as namespace commonUtils;
declare module 'commonUtils' {
    export = all
}