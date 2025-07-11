<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

interface IBaseInputProps {
  type?: InputHTMLAttributes['type']
  placeholder?: string
  disabled?: boolean
}

const model = defineModel<string>({
  required: false,
  default: '',
})

const props = withDefaults(defineProps<IBaseInputProps>(), {
  type: 'text',
})
</script>

<template>
  <input
      v-model="model"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      class="input"
  />
</template>

<style scoped lang="scss" src="./styles.scss">
</style>
