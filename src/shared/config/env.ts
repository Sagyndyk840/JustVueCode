function getEnv(key: string) {
  console.log(import.meta.env)
  const envVar = import.meta.env[key]
  if (envVar === undefined) {
    throw new Error(`Env variable ${key} is required`)
  }
  return envVar
}

export const VITE_BACKEND_API_DEV_URL = getEnv('VITE_BACKEND_API_DEV_URL')
export const VITE_BACKEND_API_PROD_URL = getEnv('VITE_BACKEND_API_PROD_URL')

export const isProdEnv = getEnv('VITE_PROD')

export const BASE_URL = isProdEnv ? VITE_BACKEND_API_PROD_URL : VITE_BACKEND_API_DEV_URL
