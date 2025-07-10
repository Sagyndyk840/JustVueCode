import { instance } from './instance'

export async function get<TResponse, TParams extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  params?: TParams,
) {
  return await instance.get<TResponse>(url, { params })
}

export async function post<TResponse, TData extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  data?: TData,
) {
  return await instance.post<TResponse>(url, data)
}

export async function put<TResponse, TData extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  data?: TData,
) {
  return await instance.put<TResponse>(url, data)
}

export async function patch<TResponse, TData extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  data?: TData,
) {
  return await instance.patch<TResponse>(url, data)
}

export async function remove<TResponse, TParams extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  params?: TParams,
) {
  return await instance.delete<TResponse>(url, { params })
}
