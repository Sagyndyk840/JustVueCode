<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

interface IBaseInputProps {
  type?: InputHTMLAttributes['type']
  placeholder?: string
  disabled?: boolean
  label?: string
  fieldName?: string
}

const model = defineModel<string>({
  required: false,
  default: '',
})

const props = withDefaults(defineProps<IBaseInputProps>(), {
  type: 'text',
})

const emit = defineEmits<{
  (e: 'blur', field?: string): void
}>()

const onBlur = () => {
  emit('blur')
}
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" :for="fieldName" class="input-label">
      {{ label }}
    </label>
    <input
        :id="fieldName"
        v-model="model"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        class="input"
        @blur="onBlur"
    />
  </div>
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
