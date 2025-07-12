import { ref, watch } from 'vue'

type SimpleValidationRule = (value: string) => string | true
type ParamValidationRule = (value: string, param: number) => string | true

type ValidationRule = SimpleValidationRule | ParamValidationRule

interface ValidationRules {
  [key: string]: ValidationRule
}

const rules: ValidationRules = {
  required: (value: string): string | true => (value.trim() ? true : 'Обязательное поле'),
  email: (value: string): string | true =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : 'Некорректный email',
  minLength: (value: string, min: number): string | true =>
    value.length >= min ? true : `Минимум ${min} символов`,
  maxLength: (value: string, max: number): string | true =>
    value.length <= max ? true : `Максимум ${max} символов`,
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T | (() => Promise<T> | T),
  validationSchema: Record<keyof T, string>,
) {
  const isLoading = ref(false)
  const isInitialized = ref(false)
  const values = ref<T>({} as T)
  const errors = ref<Record<keyof T, string>>({} as Record<keyof T, string>)

  const initializeForm = async () => {
    try {
      isLoading.value = true
      const resolvedValues = typeof initialValues === 'function'
        ? await (initialValues as () => Promise<T> | T)()
        : initialValues

      values.value = { ...resolvedValues }
      isInitialized.value = true
    } finally {
      isLoading.value = false
    }
  }

  initializeForm()

  if (typeof initialValues === 'function') {
    watch(initialValues, async () => {
      await initializeForm()
    }, { deep: true })
  }

  const validateField = (field: keyof T) => {
    if (!isInitialized.value) return false

    const value = String(values.value[field] ?? '')
    const schema = validationSchema[field]

    if (!schema) return true

    const ruleNames = schema.split('|')
    for (const rule of ruleNames) {
      const [ruleName, param] = rule.split(':')
      const validator = rules[ruleName]

      if (!validator) continue

      let result: string | true
      if (param) {
        const paramValidator = validator as ParamValidationRule
        result = paramValidator(value, parseInt(param))
      } else {
        const simpleValidator = validator as SimpleValidationRule
        result = simpleValidator(value)
      }

      if (result !== true) {
        errors.value[field] = result
        return false
      }
    }

    delete errors.value[field]
    return true
  }

  const validateForm = () => {
    if (!isInitialized.value) return false

    let isValid = true
    Object.keys(validationSchema).forEach((field) => {
      if (!validateField(field as keyof T)) {
        isValid = false
      }
    })
    return isValid
  }

  const resetForm = async () => {
    try {
      isLoading.value = true
      const resolvedValues = typeof initialValues === 'function'
        ? await (initialValues as () => Promise<T> | T)()
        : initialValues

      values.value = { ...resolvedValues }
      errors.value = {} as Record<keyof T, string>
    } finally {
      isLoading.value = false
    }
  }


  return {
    values,
    errors,
    isLoading,
    isInitialized,
    validateField,
    validateForm,
    initializeForm,
    resetForm,
  }
}
