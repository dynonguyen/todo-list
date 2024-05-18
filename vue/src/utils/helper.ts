export const withAssets = (path: string) => `/${path}`

export function getEnv(key: keyof ImportMetaEnv): any {
  return import.meta.env[key] || ''
}
