import { ref } from 'vue'

export function useValidate() {
  const errors = ref<{ [key: string]: string }>({})

  const required = (value: string, field: string) => {
    if (!value) {
      errors.value[field] = 'Обязательное поле'
      return false
    }
    return true
  }

  const email = (value: string, field: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!pattern.test(value)) {
      errors.value[field] = 'Некорректный email'
      return false
    }
    return true
  }

  const clear = () => {
    errors.value = {}
  }

  return { errors, required, email, clear }
}
