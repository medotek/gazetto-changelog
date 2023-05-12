/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly GUDA_PUBLIC: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
