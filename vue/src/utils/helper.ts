export const withAssets = (path: string) => `/${path}`

export function getEnv(key: keyof ImportMetaEnv): any {
  return import.meta.env[key] || ''
}

export function overwrite<T extends object>(obj: T, newValue: T): T {
  Object.keys(obj).forEach((key) => delete obj[key as keyof typeof obj])
  return Object.assign(obj, newValue)
}
