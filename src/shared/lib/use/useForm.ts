import { ref } from 'vue'

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

export function useFormValidation<T extends Record<string, string>>(
  initialValues: T,
  validationSchema: Record<keyof T, string>,
) {
  const values = ref<T>({ ...initialValues })
  const errors = ref<Record<keyof T, string>>({} as Record<keyof T, string>)

  const validateField = (field: keyof T) => {
    const value = values.value[field]
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
    let isValid = true
    Object.keys(validationSchema).forEach((field) => {
      if (!validateField(field as keyof T)) {
        isValid = false
      }
    })
    return isValid
  }

  return {
    values,
    errors,
    validateField,
    validateForm,
  }
}
