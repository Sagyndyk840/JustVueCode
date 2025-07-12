type QueryValue = string | number | boolean | undefined | null
type QueryParams = Record<string, QueryValue>

export const buildQueryString = (params: QueryParams): string => {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')
}
