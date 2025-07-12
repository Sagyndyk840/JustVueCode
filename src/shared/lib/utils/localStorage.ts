export const saveToLocalStorage = <T>(namespace: string, key: string, value: T): void => {
  localStorage.setItem(`${namespace}:${key}`, JSON.stringify(value))
}

export const getFromLocalStorage = <T>(namespace: string, key: string, defaultValue: T): T => {
  const value = localStorage.getItem(`${namespace}:${key}`)
  return value ? JSON.parse(value) as T : defaultValue
}

export const removeFromLocalStorage = (namespace: string, key: string): void => {
  localStorage.removeItem(`${namespace}:${key}`)
}
